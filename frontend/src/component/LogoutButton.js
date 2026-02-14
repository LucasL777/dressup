// src/components/LogoutButton.js
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
              onClick={handleLogout}
              fullWidth
              sx={{
                backgroundColor: "#ff9a8d",
                color: "#4a536b",
                borderRadius: 3,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ff7f73",
                },
              }}
            >
              Déconnexion
            </Button>
  );
}
