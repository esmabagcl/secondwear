import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageObj";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // Favori durumu
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/clothing/${id}`);
                setProduct(res.data);

                // Kullanıcı giriş yapmışsa favori kontrolü
                const token = localStorage.getItem('token');
                if (token) {
                    const userRes = await api.get('/users/profile');
                    const favs = userRes.data.favorites || [];
                    setIsFavorite(favs.some(f => f.id === parseInt(id)));
                }
            } catch (error) {
                console.error("Ürün detay hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const toggleFavorite = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Favorilere eklemek için giriş yapmalısınız.");
            return;
        }

        try {
            if (isFavorite) {
                await api.delete(`/users/favorites/${id}`);
                setIsFavorite(false);
            } else {
                await api.post(`/users/favorites/${id}`);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Favori işlemi hatası:", error);
            alert("Favori işlemi başarısız: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="text-center p-10">Yükleniyor...</div>;
    if (!product) return <div className="text-center p-10">Ürün bulunamadı.</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Link to="/" className="text-indigo-600 hover:underline mb-6 inline-block">← Geri Dön</Link>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Sol Taraf - Resim */}
                <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-lg relative">
                    <img
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        className="w-full h-full object-cover max-h-[600px]"
                    />
                    <button
                        onClick={toggleFavorite}
                        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>

                {/* Sağ Taraf - Detaylar */}
                <div className="space-y-6">
                    <div>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                            {product.category?.name || "Kategori Yok"}
                        </span>
                        <h1 className="text-4xl font-extrabold text-slate-900 mt-4">{product.name}</h1>
                    </div>

                    <p className="text-3xl font-bold text-indigo-600">
                        {product.price} TL
                    </p>

                    <p className="text-slate-600 leading-relaxed">
                        Bu ürün hakkında detaylı açıklama henüz girilmemiş. Ancak SecondWear kalitesiyle kontrol edilmiştir.
                    </p>

                    <div className="pt-6 border-t border-slate-200">
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform hover:-translate-y-1"
                        >
                            Sepete Ekle 🛒
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
