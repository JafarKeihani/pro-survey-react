// src/components/AuthButton.jsx
import React from "react";
import { Button, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthModal } from "@contexts/AuthModalContext"; // ✅ اضافه شد

export default function AuthButton() {
  const { user, logout } = useAuth();
  const { openAuthModal } = useAuthModal(); // ✅ اینجا
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    // ✅ اگر لاگین نبود → مودال LoginForm باز شود
    if (!user) {
      openAuthModal("LoginForm", { redirect: location.pathname });
      return;
    }

    // ✅ اگر لاگین بود → Logout
    await logout();
    navigate(0);
  };

  return (
    <Button
      variant="contained"
      color={user ? "error" : "primary"}
      onClick={handleClick}
      startIcon={
        user ? (
          <Avatar src="/images/user.jpg" sx={{ width: 26, height: 26 }} />
        ) : (
          <PersonIcon />
        )
      }
      sx={{ borderRadius: "30px", textTransform: "none", px: 2 }}
    >
      {user ? "Logout" : "Login"}
    </Button>
  );
}
