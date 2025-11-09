import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useAuth } from "@contexts/AuthContext"; // استفاده از context
import { useNavigate } from "react-router-dom";

export default function LoginModal({ open, onClose, requestedPath }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ارسال اطلاعات فرم برای لاگین
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const res = await login(username, password);

      if (res.success) {
        // بعد از موفقیت، به صفحه‌ای که می‌خواستیم برویم هدایت می‌کنیم
        navigate(requestedPath || "/", { replace: true });
        onClose(); // مودال را می‌بندیم
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
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
            onClick={handleSubmit} // ارسال برای لاگین
          >
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
