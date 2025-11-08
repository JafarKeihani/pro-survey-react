import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">صفحه‌ای که دنبال آن هستید پیدا نشد.</Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        بازگشت به صفحه اصلی
      </Button>
    </Box>
  );
};

export default NotFound;
