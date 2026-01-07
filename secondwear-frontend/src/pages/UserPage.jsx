import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { getImageUrl } from "../utils/imageObj";

function UserPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const [errorInfo, setErrorInfo] = useState(null);

  const fetchData = async () => {
    try {
      const userRes = await api.get('/users/profile');
      setUserData(userRes.data);
    } catch (err) {
      console.error("Veriler alınırken hata oluştu:", err);
      // Detaylı hata bilgisini sakla
      setErrorInfo({
        message: err.message,
        status: err.response?.status,
        apiUrl: api.defaults.baseURL, // Axios base URL'ini gör
        detail: JSON.stringify(err.response?.data || {})
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    if (!window.confirm("Favorilerden çıkarmak istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/users/favorites/${id}`);
      fetchData();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Yükleniyor...</p>;

  if (!userData) {
    return (
      <div className="text-center p-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Bir Hata Oluştu 😔</h2>
        <p className="text-slate-700 mb-6">Kullanıcı bilgileri alınamadı.</p>

        {errorInfo && (
          <div className="bg-slate-100 p-4 rounded text-left text-xs font-mono mb-6 overflow-auto border border-red-200">
            <p><strong>Hata Mesajı:</strong> {errorInfo.message}</p>
            <p><strong>Hata Kodu:</strong> {errorInfo.status}</p>
            <p><strong>Bağlanılan API:</strong> {errorInfo.apiUrl}</p>
            <p><strong>Detay:</strong> {errorInfo.detail}</p>
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
        >
          Çıkış Yap ve Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="bg-slate-50 p-8 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Favorilerim ❤️</h1>
          <p className="text-slate-500 mt-1">{userData?.name} ({userData?.email})</p>
        </div>
      </header>

      <section>
        {userData?.favorites?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {userData.favorites.map(item => (
              <div key={item.id} className="flex gap-4 border border-slate-200 p-4 rounded-xl bg-white items-center">
                {item.imageUrl && <img src={getImageUrl(item.imageUrl)} className="w-16 h-16 rounded-lg object-cover bg-slate-100" />}
                <div className="flex-1">
                  <Link to={`/products/${item.id}`} className="font-bold text-slate-800 hover:underline">{item.name}</Link>
                  <p className="text-indigo-600 font-bold">{item.price} TL</p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-10">Henüz favori ürününüz yok.</p>
        )}
      </section>
    </div>
  );
}

export default UserPage;