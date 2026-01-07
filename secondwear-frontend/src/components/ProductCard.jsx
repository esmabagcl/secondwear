import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={product.imageUrl || product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h3 className="font-semibold text-lg text-slate-800">
          {product.name}
        </h3>

        <p className="text-slate-500 text-sm mt-1">
          {product.category?.name || product.category || "Kategori Yok"}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-indigo-600 font-bold text-lg">
            ₺{product.price}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            İncele
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
