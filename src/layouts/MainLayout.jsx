// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import Header from "@components/ui/Header";
import Footer from "@components/ui/Footer";
import { useThemeContext } from "@contexts/ThemeContext";
import { from } from "stylis";
export default function MainLayout() {
  const { toggleTheme, toggleDirection } = useThemeContext();
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
        {/* <AppBar position="static" color="primary" elevation={1}>
          <Toolbar> */}
        <Header
          onToggleTheme={toggleTheme}
          onToggleDirection={toggleDirection}
        />
        {/* </Toolbar>
        </AppBar> */}

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
      </Box>
    </Container>
  );
}
