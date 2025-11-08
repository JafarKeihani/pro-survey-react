// // ============================
// // 📦 IconsList.js
// // فایل مرکزی آیکن‌های پرکاربرد در پروژه
// // ============================

// // عمومی و پایه
// import HomeIcon from "@mui/icons-material/Home";
// import MenuIcon from "@mui/icons-material/Menu";
// import SettingsIcon from "@mui/icons-material/Settings";
// import InfoIcon from "@mui/icons-material/Info";
// import HelpIcon from "@mui/icons-material/Help";

// // CRUD (عملیات روی داده‌ها)
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import UploadIcon from "@mui/icons-material/Upload";

// // ناوبری و نمایش
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// // وضعیت و اعلان
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";
// import WarningIcon from "@mui/icons-material/Warning";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// // جستجو و فیلتر
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";

// // نقشه و موقعیت مکانی
// import MapIcon from "@mui/icons-material/Map";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MyLocationIcon from "@mui/icons-material/MyLocation";

// // کاربر و حساب
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import LoginIcon from "@mui/icons-material/Login";

// // صادر کردن برای استفاده در کل پروژه
// export {
//   HomeIcon,
//   MenuIcon,
//   SettingsIcon,
//   InfoIcon,
//   HelpIcon,
//   AddIcon,
//   EditIcon,
//   DeleteIcon,
//   SaveIcon,
//   UploadIcon,
//   ArrowBackIcon,
//   ArrowForwardIcon,
//   ExpandMoreIcon,
//   ExpandLessIcon,
//   CheckCircleIcon,
//   ErrorIcon,
//   WarningIcon,
//   InfoOutlinedIcon,
//   SearchIcon,
//   FilterListIcon,
//   MapIcon,
//   LocationOnIcon,
//   MyLocationIcon,
//   AccountCircleIcon,
//   LogoutIcon,
//   LoginIcon,
// };
// src/assets/icons/index.js
import {
  Home,
  Settings,
  Map,
  Table,
  Database,
  Building2,
  Users,
  PlusCircle,
  Edit,
  Trash2,
  FileSpreadsheet,
  Upload,
  Search,
  Eye,
  Layers,
} from "lucide-react";

export const Icons = {
  home: Home, // خانه یا داشبورد
  settings: Settings, // تنظیمات
  map: Map, // نمایش روی نقشه
  table: Table, // جدول داده‌ها
  database: Database, // مدیریت داده‌ها
  project: Building2, // پروژه‌ها
  users: Users, // کاربران
  add: PlusCircle, // افزودن
  edit: Edit, // ویرایش
  delete: Trash2, // حذف
  excel: FileSpreadsheet, // فایل اکسل
  upload: Upload, // بارگذاری
  search: Search, // جستجو
  view: Eye, // مشاهده
  layer: Layers, // لایه‌ها
};
