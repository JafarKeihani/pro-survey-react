// src/components/auth/LoginForm.jsx
import { Button, TextField, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm({ changeElement, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // handle form submit (Enter or button)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage(null);

    // ساده‌سازی: حداقل ولیدیشن
    if (!username.trim() || !password) {
      setMessage({
        type: "error",
        text: "لطفا نام‌کاربری و رمز را وارد کنید.",
      });
      setLoading(false);
      return;
    }

    const result = await login(username.trim(), password);
    setLoading(false);

    if (result.success) {
      onClose?.();
    } else {
      setMessage({
        type: "error",
        text: result.message || "نام‌کاربری یا رمز عبور اشتباه است.",
      });
    }
  };

  return (
    // autocomplete="off" روی فرم قرار می‌گیرد تا مرورگر کمتر autofill کند
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {message && <Alert severity={message.type}>{message.text}</Alert>}

      <TextField
        label="Username"
        name="username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        // تعیین autocomplete صحیح برای username
        autoComplete="username"
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // استفاده از new-password برای کاهش نمایش پسوردهای ذخیره‌شده
        autoComplete="new-password"
      />

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Button
        variant="text"
        fullWidth
        onClick={() => changeElement("RegisterForm")}
      >
        Create New Account
      </Button>

      <Button variant="outlined" fullWidth color="error" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
}
