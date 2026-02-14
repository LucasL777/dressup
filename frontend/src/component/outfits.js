import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import NewOutfitModal from "../component/newOutfitModal";

export default function Outfits() {
    const [outfitList, setOutfitList] = useState([]);
    const [newOutfitModal, setNewOutfitModal] = useState(false);

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
     AJOUT OUTFIT
  ====================== */
  const handleAddOutfit = (outfitName) => {
    setOutfitList(prev => [...prev, { name: outfitName }]);
  };

    return (
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
        );
}