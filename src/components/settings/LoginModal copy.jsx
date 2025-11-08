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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

export default function LoginModal({ open, onClose, from = null }) {
  const { login } = useAuth(); // ← استفاده از Context
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // فقط برای ورود
  const [error, setError] = useState("");

  // helper برای پیدا کردن roles مورد نیاز یک path
  function findRequiredRoles(routesConfig, pathname) {
    for (const group of routesConfig) {
      if (!group.routes) continue;
      for (const r of group.routes) {
        if (!r.path) continue;

        // مقایسه ساده مسیرها
        if (r.path === pathname) {
          return r.roles || null;
        }
      }
    }
    return null;
  }

  // مسیر مورد نظر برای بازگشت بعد از لاگین
  const requestedPath = from?.pathname || location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("FIELDS_REQUIRED"); // پیام استاندارد انگلیسی
      return;
    }

    try {
      // فراخوانی login از Context
      const res = await login(username, password);

      if (!res.success) {
        setError(res.message); // پیام استاندارد از Context
        return;
      }

      // بستن مودال
      onClose?.();

      // هدایت به مسیر مورد نظر یا پیش‌فرض

      navigate(requestedPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError("LOGIN_FAILED"); // پیام خطای عمومی
    }
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
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <Box color="error.main">{error}</Box>}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
