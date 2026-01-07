import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useState } from 'react';

function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Satın almak için lütfen giriş yapın veya kayıt olun.");
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) return;

        if (!window.confirm("Sepeti onaylıyor musunuz?")) return;

        setLoading(true);
        try {
            const clothingIds = cartItems.map(item => item.id);
            await api.post('/orders', { clothingIds });

            alert("Siparişiniz başarıyla oluşturuldu! 🎉");
            clearCart();
            navigate('/user-dashboard');
        } catch (error) {
            console.error("Sipariş hatası:", error);
            alert("Sipariş oluşturulurken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-10 text-center">
                <h2 className="text-2xl font-bold text-slate-700 mb-4">Sepetiniz Boş 😔</h2>
                <Link to="/products" className="text-indigo-600 hover:underline">Alışverişe Başla</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Alışveriş Sepeti ({cartItems.length})</h1>

            <div className="grid md:grid-cols-3 gap-8">

                {}
                <div className="md:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center">
                            <img src={item.imageUrl || "https://via.placeholder.com/100"} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-slate-200" />
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800">{item.name}</h3>
                                <p className="text-sm text-slate-500">{item.category?.name || "Kategori Yok"}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-indigo-600 mb-2">{item.price} TL</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs text-red-500 hover:text-red-700 font-semibold underline"
                                >
                                    Kaldır
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {}
                <div className="h-fit bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-700">Sipariş Özeti</h3>

                    <div className="flex justify-between mb-2 text-slate-600">
                        <span>Ara Toplam</span>
                        <span>{calculateTotal()} TL</span>
                    </div>
                    <div className="flex justify-between mb-4 text-slate-600">
                        <span>Kargo</span>
                        <span className="text-green-600 font-medium">Bedava</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-xl text-slate-900 mb-6">
                        <span>Toplam</span>
                        <span>{calculateTotal()} TL</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? "İşleniyor..." : "Sepeti Onayla & Satın Al"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
