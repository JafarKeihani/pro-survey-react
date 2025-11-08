import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "@/routes/routeConfig";

const Sidebar = ({ open, onClose, direction }) => {
  // فقط گروه‌های عمومی (layout = MainLayout)
  const publicRoutes =
    routes.find((g) => g.layout && g.role === null)?.routes || [];

  // فیلتر نمایش‌دهنده‌ها (آیتم‌هایی که hidden نیستند)
  const menuItems = publicRoutes.filter((r) => !r.hidden);

  return (
    <Drawer key={direction} open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6">منو</Typography>
        <Divider sx={{ my: 1 }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={onClose}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.nameFa} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
