import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette, fontConfig } from "./tokens";

export const getTheme = (mode) => {
  const palette = mode === "light" ? lightPalette : darkPalette;

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.primary.main },
      secondary: { main: palette.secondary.main },
      background: {
        default: palette.background.default,
        paper: palette.background.paper, /// mode === "light" ? "#fff" : "#1e1e1e", // برای تم واقعی‌تر
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
  });
};
///////////////////////////////////////
// فقط مقادیر اصلی از پالت
