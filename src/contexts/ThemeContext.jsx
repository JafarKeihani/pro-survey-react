import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [direction, setDirection] = useState(
    localStorage.getItem("dir") || "rtl"
  );
  const [mode, setMode] = useState("light");

  const toggleDirection = () => {
    const newDir = direction === "rtl" ? "ltr" : "rtl";
    setDirection(newDir);
    localStorage.setItem("dir", newDir);
  };

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "muirtl" : "mui",
        stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
      }),
    [direction]
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: { mode },
        typography: { fontFamily: "IRANSans" },
      }),
    [mode, direction]
  );

  return (
    <ThemeContext.Provider
      value={{ direction, mode, toggleTheme, toggleDirection }}
    >
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
