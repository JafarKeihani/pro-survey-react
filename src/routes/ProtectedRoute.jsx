// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

/**
 * ProtectedRoute
 * ---------------------------
 * مسئول کنترل مجوز ورود به مسیرهای حفاظت‌شده
 *
 * Props:
 *  - element: کامپوننت مقصد
 *  - requiredRole: یک نقش یا آرایه نقش ها (اختیاری)
 *
 * رفتار:
 * ✅ اگر کاربر لاگین نباشد → هدایت به /auth-required
 * ✅ اگر نقش لازم باشد و کاربر نداشته باشد → هدایت به /unauthorized
 * ✅ در صورت مجاز بودن → کامپوننت نمایش داده می‌شود
 */

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1️⃣ اگر کاربر لاگین نیست
  if (!isAuthenticated) {
    return <Navigate to="/auth-required" replace state={{ from: location }} />;
  }

  // 2️⃣ اگر نقش مورد نیاز تعریف نشده → مسیر فقط لاگین می‌خواهد
  if (!requiredRole) {
    return element;
  }

  // 3️⃣ اگر requiredRole یک رشته باشد به آرایه تبدیل کن
  const requiredRolesArray = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  // 4️⃣ بررسی نقش کاربر
  if (!requiredRolesArray.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
