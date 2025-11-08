// 📁 src/pages/loginForm/Login.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { searchByField } from "../../data/indexedDBNCokhteman";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await searchByField("list_users", "username", username);
      if (!user) return setError("❌ کاربر یافت نشد");
      if (user[0].password !== password)
        return setError("❌ رمز عبور اشتباه است");

      login(user[0], user[0].role);

      // مسیر‌دهی بر اساس نقش
      switch (user[0].role) {
        case "admin":
          navigate("/admin/projects");
          break;
        case "userNezam":
          navigate("/user/projects");
          break;
        default:
          navigate("/User");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ خطا در ورود کاربر");
    }
  });

  return (
    <div
      style={{
        maxWidth: 350,
        margin: "80px auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fafafa",
      }}
    >
      <h2>ورود به سیستم</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "6px 0" }}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "6px 0" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ورود
        </button>
        <button
          type="button"
          onClick={() => navigate("/add-user")}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px",
            background: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ایجاد حساب جدید
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
