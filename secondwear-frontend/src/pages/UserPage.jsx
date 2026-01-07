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

  const fetchData = async () => {
    try {
      const userRes = await api.get('/users/profile');
      setUserData(userRes.data);
    } catch (err) {
      console.error("Veriler alınırken hata oluştu:", err);
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
          <div className="grid md:grid-grid-cols-2 gap-4">
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