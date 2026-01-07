import { useState, useEffect } from 'react';
import api from '../api/axios';
import { getImageUrl } from "../utils/imageObj";

function AdminPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', categoryId: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [imgFile, setImgFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await api.get('/clothing');
      setItems(res.data);
    } catch (error) {
      console.error("Ürünler yüklenirken hata:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
      if (res.data.length > 0 && !form.categoryId) {
        setForm(prev => ({ ...prev, categoryId: res.data[0].id }));
      }
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      categoryId: item.category?.id || categories[0]?.id
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ name: '', price: '', categoryId: categories[0]?.id || '' });
    setImgFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert("Lütfen bir kategori seçin!");
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('categoryId', form.categoryId);

    if (imgFile) {
      formData.append('image', imgFile);
    }

    try {
      if (editId) {
        await api.patch(`/clothing/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Ürün güncellendi!");
        setEditId(null);
      } else {
        await api.post('/clothing', formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Ürün eklendi!");
      }

      fetchItems();
      setForm({ name: '', price: '', categoryId: categories[0]?.id || '' });
      setImgFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("İşlem hatası: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', categoryForm);
      fetchCategories();
      setCategoryForm({ name: '' });
      alert("Kategori eklendi!");
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Silinsin mi?")) return;
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        { }
        <div className="space-y-8">
          { }
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Kategori Ekle</h2>
            <form className="space-y-4" onSubmit={handleCategorySubmit}>
              <input
                className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Kategori Adı"
                value={categoryForm.name}
                onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })}
                required
              />
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition">Kategori Ekle</button>
            </form>
            <div className="mt-4 max-h-32 overflow-y-auto space-y-2">
              {categories.map(c => (
                <div key={c.id} className="flex justify-between text-sm px-2">
                  <span>{c.name}</span>
                  <button onClick={() => handleDeleteCategory(c.id)} className="text-red-500 font-bold">x</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        { }
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-xl font-bold mb-6">{editId ? "Ürünü Düzenle" : "Ürün Ekle"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <select
              className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
              value={form.categoryId}
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Kategori Seçiniz</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <input
              className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ürün Adı"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Fiyat"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />

            <div className="bg-slate-50 p-3 rounded-xl">
              <label className="block text-sm text-slate-500 mb-1">Ürün Görseli</label>
              <input
                type="file"
                className="w-full text-sm text-slate-500"
                onChange={e => setImgFile(e.target.files[0])}
              />
            </div>

            <div className="flex gap-2">
              {editId && (
                <button type="button" onClick={handleCancelEdit} className="flex-1 py-3 bg-slate-200 rounded-xl">İptal</button>
              )}
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">
                {editId ? "Güncelle" : "Ekle"}
              </button>
            </div>
          </form>
        </div>

        { }
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left">Ürün</th>
                <th className="px-6 py-4 text-left">Kategori</th>
                <th className="px-6 py-4 text-left">Fiyat</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(i => (
                <tr key={i.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-700 flex items-center gap-3">
                    {i.imageUrl && <img src={getImageUrl(i.imageUrl)} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-200" />}
                    {i.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{i.category?.name || '-'}</td>
                  <td className="px-6 py-4 text-indigo-600 font-bold">{i.price} TL</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(i)} className="text-yellow-500 mr-2">DÜZENLE</button>
                    <button onClick={async () => { await api.delete(`/clothing/${i.id}`); fetchItems(); }} className="text-red-400 font-bold">SİL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;