import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import NewClothModal from "../component/newClothModal";
import NewOutfitModal from "../component/newOutfitModal";
import EditClothModal from "../component/modifyClothModal";

function Dressing() {
  const navigate = useNavigate();

  const [selectedView, setSelectedView] = useState("clothes");
  const [clothesList, setClothesList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);

  // 🔹 state des modals
  const [newClothModal, setNewClothModal] = useState(false);
  const [newOutfitModal, setNewOutfitModal] = useState(false);
  const [editClothModal, setEditClothModal] = useState(false);

  const [selectedEditCloth, setSelectedEditCloth] = useState(null);

  const handleLogout = () => navigate("/");

  /* ======================
     FETCH CLOTHES
  ====================== */
  useEffect(() => {
    fetch("http://localhost:5000/clothes", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClothesList(data);
        } else {
          console.error("Réponse inattendue :", data);
          setClothesList([]);
        }
      })
      .catch(err => {
        console.error("Erreur fetch clothes :", err);
        setClothesList([]);
      });
  }, []);

  /* ======================
     FETCH OUTFITS
  ====================== */
  useEffect(() => {
    fetch("http://localhost:5000/outfits")
      .then(res => res.json())
      .then(setOutfitList)
      .catch(err => console.log(err));
  }, []);

  /* ======================
     AJOUT VÊTEMENT
  ====================== */
  const handleAddCloth = async ({ type, color, taille, marque }) => {
    try {
      const response = await fetch("http://localhost:5000/newCloth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, color, taille, marque }),
      });

      const newCloth = await response.json();
      setClothesList(prev => [...prev, newCloth]);
    } catch (error) {
      console.error(error);
    }
  };

  /* ======================
     MODIFICATION VÊTEMENT ✅
     Partie corrigée : mise à jour de clothesList après modification
  ====================== */
  const handleUpdateCloth = async (updatedCloth) => {
    try {
      const response = await fetch(
        `http://localhost:5000/clothes/${updatedCloth.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCloth),
        }
      );

      const updated = await response.json();

      // 🔥 mise à jour de la liste locale
      setClothesList(prev =>
        prev.map(cloth => (cloth.id === updated.id ? updated : cloth))
      );

      setEditClothModal(false);
      setSelectedEditCloth(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ======================
     AJOUT OUTFIT
  ====================== */
  const handleAddOutfit = (outfitName) => {
    setOutfitList(prev => [...prev, { name: outfitName }]);
  };

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
            <Button
              onClick={handleLogout}
              fullWidth
              sx={{
                backgroundColor: "#ff9a8d",
                color: "#4a536b",
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Déconnexion
            </Button>
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
          <Grid container spacing={3}>
            {clothesList.length === 0 ? (
              <Typography>Aucun vêtement dans le dressing</Typography>
            ) : (
              <Typography>Nombre de vêtements : {clothesList.length}</Typography>
            )}

            {clothesList.map((cloth) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={cloth.id}
                onClick={() => {
                  setSelectedEditCloth(cloth);
                  setEditClothModal(true);
                }}
              >
                <Card sx={{ height: 220, borderRadius: 4, cursor: "pointer" }}>
                  <CardContent>
                    <Typography textAlign="center">{cloth.type_label}</Typography>
                    <Typography textAlign="center">{cloth.color_label}</Typography>
                    <Typography textAlign="center">{cloth.marque_label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* MODAL MODIFICATION */}
            {selectedEditCloth && (
              <EditClothModal
                open={editClothModal}
                handleClose={() => {
                  setEditClothModal(false);
                  setSelectedEditCloth(null);
                }}
                cloth={selectedEditCloth}
                handleUpdateCloth={handleUpdateCloth}
              />
            )}

            {/* BOUTON AJOUT */}
            <Fab
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                width: 72,
                height: 72,
                backgroundColor: "#ff9a8d",
                color: "#4a536b",
              }}
              onClick={() => setNewClothModal(true)}
            >
              <AddIcon />
            </Fab>

            <NewClothModal
              open={newClothModal}
              handleClose={() => setNewClothModal(false)}
              handleAddCloth={handleAddCloth}
            />
          </Grid>
        )}

        {selectedView === "outfits" && (
          <Grid container spacing={3}>
            {outfitList.map((outfit, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ height: 220, borderRadius: 4 }}>
                  <CardContent>
                    <Typography textAlign="center">{outfit.id}</Typography>
                    <Typography textAlign="center">{outfit.id_user}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Fab
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                width: 72,
                height: 72,
                backgroundColor: "#ff9a8d",
                color: "#4a536b",
              }}
              onClick={() => setNewOutfitModal(true)}
            >
              <AddIcon />
            </Fab>

            <NewOutfitModal
              open={newOutfitModal}
              handleClose={() => setNewOutfitModal(false)}
              handleAddOutfit={handleAddOutfit}
            />
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Dressing;
