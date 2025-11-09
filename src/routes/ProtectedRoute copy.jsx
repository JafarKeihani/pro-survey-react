// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import getRedirectTo from "../utils/getRedirectTo";

export default function ProtectedRoute({ element, requiredRole }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // تا وقتی auth در حال چک شدن است، نباید چیزی رندر شود
  if (loading) return null;

  // ❗ نقش لازم وجود دارد → پس این مسیر محافظت‌شده است
  if (requiredRole) {
    // ✅ ۱. کاربر لاگین نیست
    if (!isAuthenticated) {
      const redirectPath = getRedirectTo("AuthRequiredForm", {
        requestedPath: location.pathname,
      });

      // اگر getRedirectTo مسیر داد → برو
      if (redirectPath) return <Navigate to={redirectPath} replace />;

      // اگر مسیر نداد → هیچی رندر نکن
      return null;
    }

    // ✅ ۲. اگر کاربر لاگین هست نقش باید چک شود
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!allowedRoles.includes(user.role)) {
      const redirectPath = getRedirectTo("UnauthorizedForm", {
        user,
        requestedPath: location.pathname,
      });

      if (redirectPath) return <Navigate to={redirectPath} replace />;

      return null;
    }
  }

  // ✅ مشکلی نبود → همان صفحه را نشان بده
  return element;
}
