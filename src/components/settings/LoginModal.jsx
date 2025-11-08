// src/components/Settings/LoginModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { routes } from "@routes/routeConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

export default function LoginModal({ open, onClose, from = null }) {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // پیدا کردن نقش‌های لازم برای یک مسیر
  function findRequiredRoles(routesConfig, pathname) {
    for (const group of routesConfig) {
      for (const r of group.routes || []) {
        if (r.path === pathname) return r.roles || null;
      }
    }
    return null;
  }

  const requestedPath = from?.pathname || location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("FIELDS_REQUIRED");
      return;
    }

    const res = await login(username, password);
    if (!res.success) {
      setError(res.message);
      return;
    }

    // مودال بسته شود
    onClose?.();

    const role = res.user.role; // مهم: استفاده از پاسخ login، نه user قبلی
    console.log(res.user.role, res.user);

    // اگر مسیر قبلی وجود دارد، بررسی کنیم
    if (requestedPath) {
      const requiredRoles = findRequiredRoles(routes, requestedPath);

      // اگر مسیر عمومی بود → برو همانجا
      if (!requiredRoles) {
        navigate(requestedPath, { replace: true });
        return;
      }

      // اگر نقش اجازه ورود دارد
      if (requiredRoles.includes(role)) {
        navigate(requestedPath, { replace: true });
        return;
      }

      // اگر اجازه نداشت → بفرست صفحه مخصوص خودش
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "userNezam")
        navigate("/user/projects", { replace: true });
      else navigate("/user", { replace: true });

      return;
    }

    // اگر مسیر قبلی نبود → برو به داشبورد مربوطه
    switch (role) {
      case "admin":
        navigate("/admin", { replace: true });
        break;
      case "userNezam":
        navigate("/user/projects", { replace: true });
        break;
      default:
        navigate("/user", { replace: true });
    }
    console.log(role, res.user);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      onKeyDown={(e) => {
        if (e.key === "Enter") handleLogin(e);
        if (e.key === "Escape") onClose();
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Box color="error.main">{error}</Box>}
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
