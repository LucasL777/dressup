import { Box, Drawer, Button, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";

function Menu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  


  useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await fetch("http://localhost:5000/me", { credentials: "include", method : "GET" }); // important pour cookies
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.message || "Erreur");
        setUser(data);
      } catch {
        console.error("Réponse /me non JSON :", text);
      }
    } catch (err) {
      console.error("Erreur fetch /me :", err);
    }
  };

  fetchMe();
}, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#4a536b" }}>
      
      {/* Menu latéral */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            background: "linear-gradient(160deg, #4a536b, #6b7a99)",
            color: "#fff",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", py: 3 }}>
          
          {/* Logo / Titre */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Button
              onClick={() => navigate("/")}
              sx={{ textTransform: "none" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  fontStyle: "italic",
                  letterSpacing: 1,
                  color: "#ff9a8d",
                }}
              >
                Dress-Up
              </Typography>
            </Button>
            <Typography sx={{ fontSize: "0.85rem", opacity: 0.7 }}>
              Your digital wardrobe
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mx: 3, mb: 4 }} />

          {/* Navigation */}
          <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Dressing", path: "/dressing" },
              { label: "New clothes", path: "/newClothes" },
              { label: "New outfits", path: "/newOutfits" },
            ].map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  textTransform: "none",
                  fontSize: "1.1rem",
                  color: "#e2e8f0",
                  borderRadius: 3,
                  paddingY: 1.2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 154, 141, 0.6)",
                    color: "#4a536b",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Espace extensible pour pousser le bouton vers le bas */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Bouton Déconnexion */}
          <Box sx={{ px: 3, pb: 3 }}>
            <LogoutButton />
          </Box>
        </Box>
      </Drawer>

      {/* Contenu principal */}
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
          backgroundColor: "#f0f4f8",
          borderTopLeftRadius: 30,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "#4a536b" }}>
          Bienvenue {user?.prenom} dans ton dressing
        </Typography>
        <Typography sx={{ color: "#64748b", maxWidth: 600 }}>
          Gère tes vêtements, crée des outfits et organise ton style au quotidien.
        </Typography>
      </Box>
    </Box>
  );
}

export default Menu;
