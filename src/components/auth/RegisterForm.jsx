import { Button, TextField } from "@mui/material";

export default function RegisterForm({ changeElement, onClose }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <TextField label="Full Name" fullWidth />
      <TextField label="Email" fullWidth />
      <TextField label="Password" type="password" fullWidth />

      <Button variant="contained" fullWidth>
        {" "}
        Register{" "}
      </Button>

      <Button variant="text" onClick={() => changeElement("LoginForm")}>
        Already registered? Login
      </Button>

      <Button variant="outlined" color="error" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
