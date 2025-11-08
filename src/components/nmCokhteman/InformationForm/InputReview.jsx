import React from "react";
import { Typography, Stack, Divider } from "@mui/material";

export default function StepReview({ data }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">مرور اطلاعات</Typography>
      <Divider />

      <Typography>نام پروژه: {data.name}</Typography>
      <Typography>کد پروژه: {data.code}</Typography>
      <Typography>نوع پروژه: {data.type}</Typography>
      <Typography>استان: {data.province}</Typography>
      <Typography>شهر: {data.city}</Typography>
      <Typography>مختصات: {data.coordinates}</Typography>
      <Typography>
        فایل‌ها:{" "}
        {data.files.length > 0 ? `${data.files.length} عدد` : "انتخاب نشده"}
      </Typography>
    </Stack>
  );
}
