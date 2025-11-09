import { Button } from "@mui/material";

export default function UnauthorizedForm({ changeElement, onClose }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>You are not authorized to view this page.</p>

      <Button
        variant="contained"
        onClick={() => changeElement("LoginForm")}
        fullWidth
      >
        Login
      </Button>

      <Button variant="outlined" color="error" fullWidth onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
