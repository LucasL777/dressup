import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

function NewOutfitModal({ open, handleClose, handleAddOutfit }) {
  const [outfitName, setOutfitName] = useState("");

  const handleSubmit = () => {
    if (!outfitName.trim()) return;
    handleAddOutfit(outfitName);
    setOutfitName("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#4a536b" }}>
        Ajouter un nouvel outfit
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nom du vêtement"
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
          autoFocus
          fullWidth
        />

        <Typography variant="body2" color="text.secondary">
          Entrez le nom du vêtement à ajouter.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ff9a8d",
            color: "#4a536b",
            "&:hover": { backgroundColor: "#ff7f73" },
          }}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewOutfitModal;
