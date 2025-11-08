import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  Collapse,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloudIcon from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";

import AppsIcon from "@mui/icons-material/Apps";
import { useThemeContext } from "../../contexts/ThemeContext";

// ✅ دریافت props برای تغییر تم و تغییر RTL/LTR
const Header = ({ onToggleTheme, onToggleDirection }) => {
  const theme = useTheme();
  const { mode, direction } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [forecastOpen, setForecastOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { title: "صفحه اصلی" },
    { title: "خدمات" },
    { title: "نقشه‌ها" },
    { title: "تماس با ما" },
  ];

  return (
    <>
      {/* ============ HEADER ROW 1 ============ */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              ProSurvey
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            {/* ✅ دکمه تغییر تم */}
            {/* <IconButton color="inherit" onClick={onToggleTheme}>
              {theme.palette.mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton> */}
            <IconButton onClick={onToggleTheme} color="inherit">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            <IconButton onClick={onToggleDirection} color="inherit">
              {direction === "rtl" ? (
                <FormatTextdirectionLToRIcon />
              ) : (
                <FormatTextdirectionRToLIcon />
              )}
            </IconButton>
            <Button color="inherit" variant="outlined">
              ورود
            </Button>
          </Stack>
        </Toolbar>

        {/* ============ HEADER ROW 2 ============ */}
        <Toolbar
          sx={{
            bgcolor: theme.palette.background.paper,
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography noWrap>📅 تاریخ: 1403/08/15 | 2025-11-05</Typography>
          <Typography noWrap>🗓 سه‌شنبه</Typography>
          <Typography noWrap>📍 UTM: (432000 , 3988000)</Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <CloudIcon />
            <Typography noWrap>17°C</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              endIcon={forecastOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setForecastOpen(!forecastOpen)}
            >
              پیش‌بینی هوا
            </Button>

            <Button
              endIcon={toolsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              ابزار کاربردی
            </Button>

            {/* ✅ دکمه تغییر جهت RTL ⇆ LTR */}
            <Button onClick={onToggleDirection}>
              {theme.direction === "rtl" ? "LTR" : "RTL"}
            </Button>
          </Stack>

          <Collapse in={forecastOpen}>
            <Box sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
              <Typography>
                ✅ پیش‌بینی ۷ روز آینده (در آینده وصل می‌کنیم)
              </Typography>
            </Box>
          </Collapse>

          <Collapse in={toolsOpen}>
            <Box sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
              <Typography>
                🔧 ابزار کاربردی: تبدیل مختصات، نقشه زنده، ...
              </Typography>
            </Box>
          </Collapse>
        </Toolbar>
      </AppBar>

      {/* ============ SIDEBAR ============ */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 260, p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main" }}>J</Avatar>
            <Typography>جعفر کیهانی</Typography>
          </Stack>

          <Stack direction="row" spacing={1} mt={2}>
            <Button startIcon={<DashboardIcon />} fullWidth>
              داشبورد
            </Button>
            <Button startIcon={<LogoutIcon />} color="error" fullWidth>
              خروج
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <List>
            {menuItems.map((item, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
