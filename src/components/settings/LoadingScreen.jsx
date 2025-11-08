import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function LoadingScreen({ text = "در حال بارگذاری..." }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}
