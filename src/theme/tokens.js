// src/theme/tokens.js
import { createTheme } from "@mui/material/styles";

// ایجاد تم‌های پیش‌فرض MUI
const defaultTheme = createTheme();
const defaultDarkTheme = createTheme({ palette: { mode: "dark" } });

//   استخراج فقط پالت‌ها براساس پیش فرض متریال
export const lightPalette = defaultTheme.palette;
export const darkPalette = defaultDarkTheme.palette;
export const fontConfig = {
  main: "Vazirmatn, Roboto, sans-serif",
  headings: "Vazirmatn, Arial, sans-serif",
};
console.log(defaultTheme.palette);
console.log(defaultDarkTheme.palette);

// 🎨 پالت رنگی کامل و استاندارد برای تم روشن و تاریک

// export const lightPalette = {
//   primary: {
//     main: "#1976d2",
//     light: "#63a4ff",
//     dark: "#004ba0",
//     contrastText: "#ffffff",
//   },
//   secondary: {
//     main: "#9c27b0",
//     light: "#d05ce3",
//     dark: "#6a0080",
//     contrastText: "#ffffff",
//   },
//   background: {
//     default: "#f5f5f5",
//     paper: "#ffffff",
//   },
//   text: {
//     primary: "#212121",
//     secondary: "#555555",
//   },
// };

// export const darkPalette = {
//   primary: {
//     main: "#90caf9",
//     light: "#e3f2fd",
//     dark: "#42a5f5",
//     contrastText: "#000000",
//   },
//   secondary: {
//     main: "#f48fb1",
//     light: "#f8bbd0",
//     dark: "#c2185b",
//     contrastText: "#000000",
//   },
//   background: {
//     default: "#121212",
//     paper: "#1e1e1e",
//   },
//   text: {
//     primary: "#ffffff",
//     secondary: "#aaaaaa",
//   },
// };

// // 🧩 پیکربندی فونت‌ها
// export const fontConfig = {
//   main: "Vazirmatn, Roboto, sans-serif",
//   headings: "Vazirmatn, Arial, sans-serif",
// };
