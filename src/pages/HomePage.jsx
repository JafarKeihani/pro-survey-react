import React, { useState, useEffect } from "react";
import { Button, Drawer, Box } from "@mui/material";

export default async function HomePage() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState("rtl");

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  return (
    <>
      <Button
        onClick={() => setDirection(direction === "rtl" ? "ltr" : "rtl")}
        variant="contained"
        sx={{ m: 1 }}
      >
        تغییر جهت ({direction})
      </Button>

      <Button onClick={() => setOpen(true)} variant="outlined" sx={{ m: 1 }}>
        بازکردن Drawer
      </Button>

      <Drawer
        key={direction} // ✅ این مهمه برای ری‌مونت و انیمیشن صحیح
        anchor={direction === "rtl" ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 230, p: 2 }}>
          انیمیشن باید از سمت {direction === "rtl" ? "راست" : "چپ"} بیاد ✅
        </Box>
      </Drawer>
    </>
  );
}
