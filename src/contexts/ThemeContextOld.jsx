import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme/theme";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // اگر از قبل حالت تم در مرورگر ذخیره شده باشد، بخوان
    return sessionStorage.getItem("themeMode") || "light";
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      sessionStorage.setItem("themeMode", next);
      return next;
    });
  };

  // فقط زمانی که mode تغییر می‌کند، تم جدید ساخته شود
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* 👈 پس‌زمینه و رنگ‌ها را هماهنگ می‌کند */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
