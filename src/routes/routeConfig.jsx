// src/routes/routeConfig.js
import React, { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";

import NotFound from "@pages/loginForm/NotFound";
import AuthRequired from "@pages/loginForm/AuthRequired";
import Unauthorized from "@pages/loginForm/Unauthorized";

// Layouts
const MainLayout = lazy(() => import("@layouts/MainLayout"));
const AdminLayout = lazy(() => import("@layouts/AdminLayout"));
const UserLayout = lazy(() => import("@layouts/UserLayout"));

// Public pages
const HomePage = lazy(() => import("@pages/HomePage"));
const AboutPage = lazy(() => import("@pages/mainSite/AboutPage"));
const ContactPage = lazy(() => import("@pages/mainSite/ContactPage"));
const ServicePage = lazy(() => import("@pages/mainSite/ServicePage"));
const LearningCenterPage = lazy(() =>
  import("@pages/mainSite/LearningCenterPage")
);
const ToolsPage = lazy(() => import("@pages/mainSite/ToolsPage"));

//const RegisterForm = lazy(() => import("@pages/loginForm/RegisterForm"));
import Register from "@components/auth/Register";

// Admin pages
const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const Settings = lazy(() => import("@pages/admin/Settings"));

// User pages
const UserPublic = lazy(() => import("@pages/user/UserPublic"));
const UserNMCokhteman = lazy(() => import("@pages/user/UserNMCokhteman"));

// ROUTES CONFIG
// هر آیتم حاوی nameFa و nameEn است. می‌توانید بعدا کلید ترجمه قرار دهید.
export const routes = [
  {
    layout: MainLayout,
    role: null, // عمومی
    titleFa: "عمومی",
    titleEn: "Public",
    routes: [
      {
        path: "/",
        element: <HomePage />,
        nameFa: "خانه",
        nameEn: "Home",
        icon: <HomeIcon />,
      },
      {
        path: "/about",
        element: <AboutPage />,
        nameFa: "درباره ما",
        nameEn: "About",
        icon: <InfoIcon />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
        nameFa: "تماس با ما",
        nameEn: "Contact",
        icon: <ContactMailIcon />,
      },
      {
        path: "/service",
        element: <ServicePage />,
        nameFa: "خدمات",
        nameEn: "Services",
        icon: <BuildIcon />,
      },
      {
        path: "/learningCenter",
        element: <LearningCenterPage />,
        nameFa: "آموزش",
        nameEn: "Learning",
        icon: <SchoolIcon />,
      },
      {
        path: "/tools",
        element: <ToolsPage />,
        nameFa: "ابزارها",
        nameEn: "Tools",
        icon: <BuildIcon />,
      },
      {
        path: "/register",
        element: <Register />,
        nameFa: "ثبت‌نام",
        nameEn: "Register",
        icon: null,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
        nameFa: "دسترسی",
        nameEn: "Unauthorized",
        icon: null,
        hidden: true, // توی منو نمایش داده نشه
      },
      {
        path: "/auth-required",
        element: <AuthRequired />,
        nameFa: "دسترسی",
        nameEn: "AuthRequired",
        icon: null,
        hidden: true, // توی منو نمایش داده نشه
      },
      {
        path: "/NotFound",
        element: <NotFound />,
        nameFa: "دسترسی",
        nameEn: "NotFound",
        icon: null,
        hidden: true, // توی منو نمایش داده نشه
      },
    ],
  },

  {
    layout: AdminLayout,
    role: "admin",
    titleFa: "مدیریت",
    titleEn: "Admin",
    routes: [
      {
        path: "/admin",
        element: <Dashboard />,
        nameFa: "داشبورد",
        nameEn: "Dashboard",
        icon: <DashboardIcon />,
        roles: ["admin"],
      },
      {
        path: "/admin/settings",
        element: <Settings />,
        nameFa: "تنظیمات",
        nameEn: "Settings",
        icon: <SettingsIcon />,
        roles: ["admin"],
      },
    ],
  },

  {
    layout: UserLayout,
    role: "user",
    titleFa: "کاربر",
    titleEn: "User",
    routes: [
      {
        path: "/user",
        element: <UserPublic />,
        nameFa: "پنل کاربری",
        nameEn: "User Home",
        icon: null,
        roles: ["user", "userNezam"],
      },
      {
        path: "/user/projects",
        element: <UserNMCokhteman />,
        nameFa: "پروژه‌های من",
        nameEn: "My Projects",
        icon: null,
        roles: ["user", "userNezam"],
      },
    ],
  },
];
