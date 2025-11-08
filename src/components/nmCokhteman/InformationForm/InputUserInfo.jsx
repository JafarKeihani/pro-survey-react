import React from "react";
import { Grid, TextField } from "@mui/material";

export default function StepBasicInfo({ data, onChange }) {
  const isEmpty = (val) => val.trim() === "";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="نام پروژه"
          fullWidth
          required
          value={data.name}
          error={isEmpty(data.name)}
          helperText={isEmpty(data.name) ? "نام پروژه الزامی است" : ""}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="کد پروژه"
          fullWidth
          required
          value={data.code}
          error={isEmpty(data.code)}
          helperText={isEmpty(data.code) ? "کد پروژه الزامی است" : ""}
          onChange={(e) => onChange("code", e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="نوع پروژه"
          fullWidth
          required
          value={data.type}
          error={isEmpty(data.type)}
          helperText={isEmpty(data.type) ? "نوع پروژه الزامی است" : ""}
          onChange={(e) => onChange("type", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
