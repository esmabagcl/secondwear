import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Email veya şifre hatalı");
      }

      const data = await response.json();

      
      localStorage.setItem("token", data.token);
      
      
      
      
      

      
      
      
      if (data.role) {
        localStorage.setItem("role", data.role);
        console.log("Rol kaydedildi:", data.role);

        if (data.role === 'admin') {
          alert(`Giriş başarılı! Admin paneline yönlendiriliyorsunuz. (Rol: ${data.role})`);
          navigate("/admin");
        } else if (data.role === 'user') {
          alert(`Giriş başarılı! Kullanıcı paneline yönlendiriliyorsunuz. (Rol: ${data.role})`);
          navigate("/user-dashboard");
        } else {
          alert(`Rol tanınamadı: ${data.role}. Ana sayfaya gidiliyor.`);
          navigate("/");
        }
      } else {
        console.warn("Backend rol döndürmedi!");
        alert("Giriş başarılı ancak ROL bilgisi gelmedi. Lütfen yetkilinizle görüşün.");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Giriş Yap
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Giriş
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
