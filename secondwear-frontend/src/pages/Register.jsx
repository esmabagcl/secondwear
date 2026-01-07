import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });


  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Gönderilen veri:", formData);

    if (formData.password.length < 6) {
      alert("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    try {


      const response = await api.post("/auth/register", formData);

      if (response.status === 201 || response.status === 200) {
        alert("Kayıt Başarılı!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Hata detayı:", error.response?.data || error.message);
      alert("Hata: " + (error.response?.data?.message || "Sunucuya bağlanılamadı!"));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "350px", background: "#f9f9f9", padding: "30px", borderRadius: "10px" }}>
        <h2 style={{ textAlign: "center" }}>Kayıt Ol</h2>
        <input type="text" placeholder="Kullanıcı Adı" onChange={(e) => setFormData({ ...formData, name: e.target.value.trim() })} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input type="email" placeholder="E-posta" onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input type="password" placeholder="Şifre" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />

        { }
        <select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          value={formData.role}
        >
          <option value="user">Kullanıcı</option>
          <option value="admin">Admin (Satıcı)</option>
        </select>

        <button type="submit" style={{ padding: "12px", background: "#4c4ce2", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;