import { useState } from "react";
import {
  Box,
  Drawer,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";
import Clothes from "../component/clothes";
import Outfits from "../component/outfits";


function Dressing() {

  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("clothes");

  return (
    
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#4a536f" }}>
      {/* MENU */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            background: "linear-gradient(160deg, #4a536b, #6b7a99)",
            color: "#fff",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", py: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Button onClick={() => navigate("/menu")} sx={{ textTransform: "none" }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  fontStyle: "italic",
                  color: "#ff9a8d",
                }}
              >
                Dress-Up
              </Typography>
            </Button>
            <Typography sx={{ fontSize: "0.8rem", opacity: 0.7 }}>
              Your digital wardrobe
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mx: 3, mb: 4 }} />

          <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              onClick={() => setSelectedView("clothes")}
              sx={{
                textTransform: "none",
                fontSize: "1.2rem",
                color: "#e2e8f0",
                borderRadius: 3,
                backgroundColor:
                  selectedView === "clothes"
                    ? "rgba(255,154,141,0.6)"
                    : "rgba(255,255,255,0.08)",
              }}
            >
              Clothes
            </Button>

            <Button
              onClick={() => setSelectedView("outfits")}
              sx={{
                textTransform: "none",
                fontSize: "1.2rem",
                color: "#e2e8f0",
                borderRadius: 3,
                backgroundColor:
                  selectedView === "outfits"
                    ? "rgba(255,154,141,0.6)"
                    : "rgba(255,255,255,0.08)",
              }}
            >
              Outfits
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ px: 3 }}>
            <LogoutButton />
          </Box>
        </Box>
      </Drawer>

      {/* CONTENU */}
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
          backgroundColor: "#f0f4f8",
          borderTopLeftRadius: 30,
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" sx={{ color: "#4a536b", mb: 3 }}>
          {selectedView === "clothes" ? "Mes vêtements" : "Mes outfits"}
        </Typography>

        {selectedView === "clothes" && (
          <Clothes />
        )}

        {selectedView === "outfits" && (
          <Outfits />
        )}
      </Box>
    </Box>
  );
}

export default Dressing;
