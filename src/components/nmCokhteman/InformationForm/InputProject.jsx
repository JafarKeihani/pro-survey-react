import React from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function StepFiles({ data, onChange }) {
  const handleFileChange = (e) => {
    onChange("files", Array.from(e.target.files));
  };

  return (
    <Stack spacing={2}>
      <Button variant="outlined" component="label">
        انتخاب فایل‌ها
        <input type="file" hidden multiple onChange={handleFileChange} />
      </Button>

      {data.files.length > 0 && (
        <Typography>تعداد فایل‌های انتخاب‌شده: {data.files.length}</Typography>
      )}
    </Stack>
  );
}
