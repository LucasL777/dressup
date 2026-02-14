import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewClothModal from "../component/newClothModal";
import EditClothModal from "../component/modifyClothModal";
import AddIcon from "@mui/icons-material/Add";

export default function Clothes() {
    const [clothesList, setClothesList] = useState([]);

    const [newClothModal, setNewClothModal] = useState(false);
    const [editClothModal, setEditClothModal] = useState(false);
    const [selectedEditCloth, setSelectedEditCloth] = useState(null);

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

  return (
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
                    <Typography textAlign="center">{cloth.size_label}</Typography>
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
    );
}