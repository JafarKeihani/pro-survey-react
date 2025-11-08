// 📁 src/components/common/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        background: "#2c2c2c",
        color: "white",
        width: "200px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Link to="/admin" style={{ color: "white" }}>
        داشبورد
      </Link>
      <Link to="/admin/projects" style={{ color: "white" }}>
        پروژه‌ها
      </Link>
    </aside>
  );
}
