import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-indigo-600"
        >
          SECOND<span className="text-slate-900">WEAR</span>
        </Link>

        {}
        <div className="flex items-center gap-6 text-sm md:text-base font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">
            Anasayfa
          </Link>

          <Link to="/products" className="hover:text-indigo-600 transition">
            Ürünler
          </Link>

          <Link to="/cart" className="relative hover:text-indigo-600 transition flex items-center gap-1">
            Sepetim
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-indigo-600 transition">
                Giriş
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full rounded-full shadow-md hover:bg-indigo-700 transition"
              >
                Kayıt Ol
              </Link>
            </>
          ) : (
            <>
              {(role === "ADMIN" || role === "admin") && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-semibold hover:bg-indigo-100 transition"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/user-dashboard?tab=favorites"
                className="hover:text-indigo-600 transition"
              >
                Favorilerim ❤️
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
