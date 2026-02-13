import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField
} from "@mui/material";

function NewClothModal({ open, handleClose, handleAddCloth }) {
  const [typeList, setTypeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [tailleList, setTailleList] = useState([]);
  const [marqueList, setMarqueList] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTaille, setSelectedTaille] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");

  // Met à jour le type sélectionné
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleTailleChange = (event) => {
    setSelectedTaille(event.target.value);
  };

  const handleMarqueChange = (event) => {
    setSelectedMarque(event.target.value);
  };

  // Soumission du formulaire
  const handleSubmit = () => {
    if (!selectedType && !selectedColor && !selectedTaille && !selectedMarque) return;
    handleAddCloth({ type: selectedType, color: selectedColor, taille: selectedTaille, marque: selectedMarque }); // on envoie juste le label
    setSelectedType("");
    setSelectedColor("");
    setSelectedTaille("");
    setSelectedMarque("");
    handleClose();
  };

  // Récupération des types depuis la BDD
  useEffect(() => {
    fetch("http://localhost:5000/lists/types")
      .then((res) => res.json())
      .then((data) => setTypeList(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/couleurs")
      .then((res) => res.json())
      .then((data) => setColorList(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/tailles")
      .then((res) => res.json())
      .then((data) => setTailleList(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/marques")
      .then((res) => res.json())
      .then((data) => setMarqueList(data))
      .catch((err) => console.log(err));
  }, []);

  //return du composant
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#4a536b" }}>
        Ajouter un nouveau vêtement
      </DialogTitle>

      {/* Formulaire de saisie */}
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        {/* Sélecteurs pour type */}
        <FormControl fullWidth>
          <Select
            labelId="type-select-label"
            value={selectedType}
            onChange={handleTypeChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Type du vêtement</em>
            </MenuItem>
            {typeList.map((type, index) => (
              <MenuItem key={index} value={type.id}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélecteurs pour couleur */}      
        <FormControl fullWidth>
          <Select
            labelId="color-select-label"
            value={selectedColor}
            onChange={handleColorChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Couleur du vêtement</em>
            </MenuItem>
            {colorList.map((color, index) => (
              <MenuItem key={index} value={color.id}>
                {color.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélecteurs pour taille */}
        <FormControl fullWidth>
          <Select
            labelId="taille-select-label"
            value={selectedTaille}
            onChange={handleTailleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Taille du vêtement</em>
            </MenuItem>
            {tailleList.map((taille, index) => (
              <MenuItem key={index} value={taille.id}>
                {taille.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélecteurs pour marque */}
        <FormControl fullWidth>
          <Select
            labelId="marque-select-label"
            value={selectedMarque}
            onChange={handleMarqueChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Marque du vêtement</em>
            </MenuItem>
            {marqueList.map((marque, index) => (
              <MenuItem key={index} value={marque.id}>
                {marque.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>                   
      </DialogContent>

      {/* Actions du dialogue */}      
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

export default NewClothModal;
