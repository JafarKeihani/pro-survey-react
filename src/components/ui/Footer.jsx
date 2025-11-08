import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  useTheme,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import HubIcon from "@mui/icons-material/Hub";

const Footer = () => {
  const theme = useTheme(); // دسترسی به پالت رنگ تم

  return (
    <Stack //class="MuiStack-root"
      direction="row" //{{ xs: 'column', sm: 'row' }}
      //direction= row row-reverse column column-reverse
      spacing={3} //{{ xs: 1, sm: 2, md: 4 }} 0/.5/1/2/3/4/8/12
      // divider={<Divider orientation="vertical" flexItem />}
      //   sx={{ minWidth: 0 }} if want used noWrap in childeren
      // // useFlexGap // sx={{ flexWrap: "wrap" }}
      sx={{
        justifyContent: "space-around",
        // justifyContent: flex-start center flex-end space-between space-around space-evenly
        alignItems: "center",
        //      alignItems: flex-start center flex-end stretch baseline
        // alignContent: "center",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {/* بخش شبکه‌های اجتماعی */}
      <Box>
        <IconButton
          href="https://t.me/username"
          target="_blank"
          color="inherit"
        >
          <TelegramIcon />
        </IconButton>
        <IconButton
          href="https://wa.me/1234567890"
          target="_blank"
          color="inherit"
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          href="https://eitaa.com/username"
          target="_blank"
          color="inherit"
        >
          <HubIcon />
        </IconButton>
        <IconButton
          href="mailto:email@example.com"
          target="_blank"
          color="inherit"
        >
          <EmailIcon />
        </IconButton>
      </Box>
      {/* بخش کپی‌رایت */}
      <Box>
        <Typography variant="body2" gutterBottom sx={{ mb: 0 }}>
          &copy; {new Date().getFullYear()} تمام حقوق محفوظ است.
        </Typography>
      </Box>
    </Stack>
  );
};

export default Footer;
