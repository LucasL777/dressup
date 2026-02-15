import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";

function EditClothModal({ open, handleClose, handleUpdateCloth, cloth }) {

  const [typeList, setTypeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [tailleList, setTailleList] = useState([]);
  const [marqueList, setMarqueList] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTaille, setSelectedTaille] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");

  /* ======================
     Préremplissage
  ====================== */
  useEffect(() => {
  if (open && cloth && typeList.length && colorList.length && marqueList.length) {
    // Types
    const typeObj = typeList.find((t) => t.label === cloth.type_label);
    setSelectedType(typeObj ? typeObj.id : "");

    // Couleurs
    const colorObj = colorList.find((c) => c.label === cloth.color_label);
    setSelectedColor(colorObj ? colorObj.id : "");

    // Tailles
    const tailleObj = tailleList.find((t) => t.label === cloth.size_label);
    setSelectedTaille(tailleObj ? tailleObj.id : "");

    // Marques
    const marqueObj = marqueList.find((m) => m.label === cloth.marque_label);
    setSelectedMarque(marqueObj ? marqueObj.id : "");
  }
}, [open, cloth, typeList, colorList, tailleList, marqueList]);


  /* ======================
     Fetch des listes
  ====================== */
  useEffect(() => {
    fetch("http://localhost:5000/lists/types")
      .then(res => res.json())
      .then(setTypeList);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/couleurs")
      .then(res => res.json())
      .then(setColorList);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/tailles")
      .then(res => res.json())
      .then(setTailleList);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/lists/marques")
      .then(res => res.json())
      .then(setMarqueList);
  }, []);

  /* ======================
     Submit
  ====================== */
  const handleSubmit = () => {
    if (!selectedType && !selectedColor && !selectedMarque && !selectedTaille) return;

    handleUpdateCloth({
      id: cloth.id,
      type: selectedType,
      color: selectedColor,
      taille: selectedTaille,
      marque: selectedMarque
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#4a536b" }}>
        Modifier le vêtement
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        {/* TYPE */}
        <FormControl fullWidth>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            displayEmpty
          >
            <MenuItem>
              <em>Type du vêtement</em>
            </MenuItem>
            {typeList.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* COULEUR */}
        <FormControl fullWidth>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Couleur</em>
            </MenuItem>
            {colorList.map((color) => (
              <MenuItem key={color.id} value={color.id}>
                {color.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* TAILLE */}
        <FormControl fullWidth>
          <Select
            value={selectedTaille}
            onChange={(e) => setSelectedTaille(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Taille</em>
            </MenuItem>
            {tailleList.map((taille) => (
              <MenuItem key={taille.id} value={taille.id}>
                {taille.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* MARQUE */}
        <FormControl fullWidth>
          <Select
            value={selectedMarque}
            onChange={(e) => setSelectedMarque(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Marque</em>
            </MenuItem>
            {marqueList.map((marque) => (
              <MenuItem key={marque.id} value={marque.id}>
                {marque.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ff9a8d",
            color: "#4a536b",
            "&:hover": { backgroundColor: "#ff7f73" }
          }}
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditClothModal;
