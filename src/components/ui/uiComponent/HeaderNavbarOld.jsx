import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";

import HeaderTop from "./HeaderTop";
import Sidebar from "./Sidebar";
import { useThemeContext } from "@/contexts/ThemeContext";

const HeaderNavbar = () => {
  const { mode, direction, toggleTheme, toggleDirection } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">ProSurvey</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            <IconButton onClick={toggleDirection} color="inherit">
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

        <HeaderTop />
        <Toolbar />
      </AppBar>

      {/* ✅ ارسال props صحیح به Sidebar */}
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction={direction}
      />
    </>
  );
};

export default HeaderNavbar;
