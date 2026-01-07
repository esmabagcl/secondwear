import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/clothing');
                setProducts(res.data);
            } catch (error) {
                console.error("Ürünler yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-extrabold text-slate-900 text-center mb-12">
                Tüm Ürünler
            </h1>

            {loading ? (
                <p className="text-center text-slate-500">Yükleniyor...</p>
            ) : products.length === 0 ? (
                <div className="text-center">
                    <p className="text-slate-500 mb-6">Henüz ürün bulunmuyor.</p>
                    <Link to="/" className="text-indigo-600 font-bold hover:underline">Anasayfaya Dön</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
