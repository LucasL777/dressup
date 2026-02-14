import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Accueil() {

  const [login, setLogin] = useState("");

  // Force le body et html à occuper toute la largeur/hauteur
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/me", {
        credentials: "include"
      });

      if (response.status === 200) {
        navigate("/menu");
      }

    } catch (err) {
      console.error(err);
    }
  };

  checkAuth();
}, [navigate]);


  // gestion de la connexion
  const handleLogin = async (login) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      credentials: "include", // important pour cookies
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ login }),
    });

    const text = await response.text();  // récupère le texte brut
    let data;
    try {
      data = JSON.parse(text);           // parse seulement si c'est JSON
    } catch {
      console.error("Réponse non JSON :", text);
      return;
    }

    if (!response.ok) {
      console.error(data.message);
      return;
    }

    // connexion OK
    navigate("/menu");

  } catch (error) {
    console.error("Erreur serveur", error);
  }
};



  // rendu du composant
  return (
    <Box
      sx={{
        width: "100vw",          
        height: "100vh",        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",      // évite les scrollbars parasites
        background: "linear-gradient(135deg, #4a536b, #aed6dc )",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 6,
          width: "20%",
          maxWidth: "500px",
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" textAlign="center" sx={{fontFamily: "'Roboto Slab', serif", color: "#4a536b", fontStyle: "italic"}} mb={4}>
          Dress-Up
        </Typography>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(login); }}>
        <TextField
          label="Nom d'utilisateur"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          sx={{ marginTop: 3, paddingY: 1.5, fontSize: "1.2rem", backgroundColor: "#ff9a8d", color: "#4a536b", fontStyle: "italic" }}
        >
          Se connecter
        </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Accueil;
