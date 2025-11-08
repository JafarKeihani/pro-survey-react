import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={`تغییر به حالت ${mode === "light" ? "تاریک" : "روشن"}`}>
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
