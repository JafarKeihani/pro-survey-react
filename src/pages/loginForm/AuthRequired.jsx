// src/pages/loginForm/AuthRequired.jsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "@components/Settings/LoginModal";

export default function AuthRequired({ from }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // مسیر درخواست شده (redirect بعد از لاگین)
  const fromPath = from || location.state?.from || "/";

  return (
    <Box sx={{ textAlign: "center", mt: 10, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        برای دسترسی به این بخش باید وارد شوید
      </Typography>

      <Button variant="contained" sx={{ mx: 1 }} onClick={() => setOpen(true)}>
        ورود / ثبت‌نام
      </Button>

      <Button variant="outlined" sx={{ mx: 1 }} onClick={() => navigate(-1)}>
        بازگشت
      </Button>

      {/* مودال لاگین — پاس دادن مسیر */}
      <LoginModal open={open} onClose={() => setOpen(false)} from={fromPath} />
    </Box>
  );
}
