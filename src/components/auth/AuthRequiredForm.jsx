import { Button } from "@mui/material";

export default function AuthRequiredForm({ changeElement, onClose }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>You must be logged in to continue.</p>

      <Button
        variant="contained"
        onClick={() => changeElement("LoginForm")}
        fullWidth
      >
        Login
      </Button>

      <Button
        variant="text"
        onClick={() => changeElement("RegisterForm")}
        fullWidth
      >
        Register
      </Button>

      <Button variant="outlined" color="error" fullWidth onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
