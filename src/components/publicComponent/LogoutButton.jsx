// src/components/AuthButton.jsx
import React, { useState } from "react";
import { Button, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "@components/settings/LoginModal";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    if (!user) {
      // کاربر لاگین نیست → مودال لاگین باز شود
      setOpenModal(true);
      return;
    }

    // اگر کاربر لاگین بود → logout
    await logout();

    // بررسی مسیر فعلی و هدایت مناسب
    const protectedRoutes = [
      "/admin",
      "/admin/settings",
      "/user",
      "/user/projects",
    ];
    // const shouldGoHome = protectedRoutes.includes(user.role);
    const isProtectedPage = protectedRoutes.some((path) =>
      location.pathname.startsWith(path)
    );
    if (isProtectedPage) {
      navigate("/", { replace: true });
    } else {
      navigate(0);
    }
  };

  return (
    <>
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

      {/* مودال لاگین */}
      <LoginModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        from={location.pathname} // مسیر فعلی به عنوان from
      />
    </>
  );
}
