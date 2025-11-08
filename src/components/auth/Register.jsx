import React, { useState } from "react";
import { registerUser } from "@services/authService";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(form);
      setMessage(result.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "خطا");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="نام کاربری" />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="رمز"
      />
      <button type="submit">ثبت نام</button>
      <p>{message}</p>
    </form>
  );
}
