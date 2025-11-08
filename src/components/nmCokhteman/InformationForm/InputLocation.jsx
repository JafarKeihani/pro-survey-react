import React from "react";
import { Grid, TextField } from "@mui/material";

export default function StepLocation({ data, onChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="استان"
          fullWidth
          value={data.province}
          onChange={(e) => onChange("province", e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="شهر"
          fullWidth
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="مختصات جغرافیایی"
          fullWidth
          value={data.coordinates}
          onChange={(e) => onChange("coordinates", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
