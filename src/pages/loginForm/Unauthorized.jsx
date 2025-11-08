// ✅ src/pages/common/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card sx={{ maxWidth: 400, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            دسترسی غیرمجاز
          </Typography>

          <Typography sx={{ mb: 3 }}>
            شما مجوز ورود به این بخش را ندارید.
          </Typography>

          <Button variant="contained" onClick={() => navigate(-1)}>
            بازگشت
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
