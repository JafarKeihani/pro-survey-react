// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "@components/ui/Header";
import Footer from "@components/ui/Footer";

// ✅ اضافه شد
import AuthModal from "@components/auth/AuthModal";
import { useAuthModal } from "@contexts/AuthModalContext";

export default function MainLayout() {
  // ✅ مقدارهای کانتکس
  const { modalType, closeAuthModal } = useAuthModal();

  return (
    <Container maxWidth="false">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Header />

        <Container sx={{ flex: 1, py: 3 }}>
          <Outlet />
        </Container>

        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Footer />
        </Box>

        {/* ✅ مودال دقیقا اینجاست */}
        {modalType && (
          <AuthModal
            open={!!modalType}
            onClose={closeAuthModal}
            element={modalType}
          />
        )}
      </Box>
    </Container>
  );
}
