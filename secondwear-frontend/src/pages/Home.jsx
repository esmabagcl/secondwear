import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/clothing');
        setProducts(res.data);
      } catch (error) {
        console.error("Ürünler yüklenirken hata:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {}
      <section className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
            Sürdürülebilir Moda
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            İkinci elin en tarz hali. Dünyayı koru, tarzını yansıt.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {}
            <a
              href="#products"
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              Alışverişe Başla
            </a>

            <Link
              to="/register"
              className="border border-indigo-600 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition"
            >
              Hemen Üye Ol
            </Link>
          </div>
        </div>
      </section>

      {}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Öne Çıkan Ürünler
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-slate-500">Henüz ürün eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
