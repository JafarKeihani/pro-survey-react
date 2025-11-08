// theme/theme.js
import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale"; // optional: ترجمه‌های MUI برای فارسی
import { lightPalette, darkPalette, fontConfig } from "./tokens";

export const getTheme = (mode, direction = "ltr") => {
  const palette = mode === "light" ? lightPalette : darkPalette;

  // base theme
  const base = {
    direction, // اضافه می‌کنیم (ltr | rtl)
    palette: {
      mode,
      primary: { main: palette.primary.main },
      secondary: { main: palette.secondary.main },
      background: {
        default: palette.background.default,
        paper: palette.background.paper,
      },
      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
      },
    },
    typography: {
      fontFamily: fontConfig.main,
      h1: { fontFamily: fontConfig.headings, fontWeight: 700 },
      h2: { fontFamily: fontConfig.headings, fontWeight: 600 },
      h3: { fontFamily: fontConfig.headings },
      body1: { fontSize: "1rem" },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: (factor) => `${0.25 * factor}rem`,
  };

  // اگر direction == 'rtl'، locale فارسی faIR را هم پاس می‌دهیم
  return direction === "rtl" ? createTheme(base, faIR) : createTheme(base);
};
