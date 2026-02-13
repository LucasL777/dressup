const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const session = require('express-session');

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


app.use(session({
  secret: '5e4ddlq5pe56xh4qap33r2', // clé pour signer le cookie de session
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true } // 1h de session
}));


// gestion de la connexion
app.post('/connexion', (req, res) => {
  const { login } = req.body;
  db.query(
    'SELECT id, nom, prenom FROM dressup_user WHERE username = ?;',
    [login],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Login incorrect" });
      }

      req.session.user = {
        id: results[0].id,
        nom: results[0].nom,
        prenom: results[0].prenom
      };

      res.status(200).json({ 
        message: "Connexion réussie", 
        user: req.session.user 
      });
    }
  );
});

app.get('/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Non connecté" });
  }
});


// récupérer les vêtements de l’utilisateur connecté
app.get('/clothes', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  db.query(
    'SELECT type_label, color_label, marque_label FROM habits WHERE id_user = ?;',
    [req.session.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});


// ajouter un vêtement pour l’utilisateur connecté
app.post('/newCloth', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  db.query(
    'INSERT INTO dressup_clothes(type, id_user, size, color, marque) VALUES (?, ?, ?, ?, ?);',
    [
      req.body.type,
      req.session.user.id,
      req.body.taille,
      req.body.color,
      req.body.marque
    ],
    (err, results) => {
      if (err) {
        console.error("SQL ERROR :", err);
        return res.status(500).json({ error: err.message });
      }

      db.query(
        `SELECT type_label, color_label, marque_label
         FROM habits
         WHERE id_user = ? AND id = ?`,
        [req.session.user.id, results.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json(rows[0]); // renvoie l’objet complet
        }
      );
  });
}); 

// mettre à jour un vêtement
app.put("/clothes/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const { id } = req.params;
  const { type, color, marque, taille } = req.body;

  // 🔹 UPDATE avec id_user pour ne modifier que les vêtements de l'utilisateur connecté
  const sql = `
    UPDATE dressup_clothes
    SET 
      type_id = ?,
      color_id = ?,
      marque_id = ?,
      taille = ?
    WHERE id = ? AND id_user = ?
  `;

  db.query(sql, [type, color, marque, taille, id, req.session.user.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur modification vêtement" });
    }

    // 🔹 SELECT pour renvoyer le vêtement complet avec labels après modification
    db.query(
      `SELECT id, type_id, color_id, marque_id, taille,
              type_label, color_label, marque_label, taille_label
       FROM habits
       WHERE id = ? AND id_user = ?`,
      [id, req.session.user.id],
      (err2, rows) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ error: "Erreur récupération vêtement modifié" });
        }

        res.json(rows[0]); // renvoie l'objet complet pour le front
      }
    );
  });
});





// a revoir -> probleme bdd
app.get('/outfits', (req, res) => {
  db.query('SELECT type, color, marque FROM dressup_clothes join dressup_composant on dressup_clothes.id = dressup_composant.id_cloth join dressup_outfits on dressup_composant.id_outfit = dressup_outfits.id ', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
         

// récupérer les listes pour les formulaires
app.get('/type', (req, res) => {
  db.query('SELECT id, label FROM dressup_type ORDER BY label ASC;', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/couleur', (req, res) => {
  db.query('SELECT id, label FROM dressup_couleur ORDER BY label ASC;', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/taille', (req, res) => {
  db.query('SELECT id, label FROM dressup_taille ORDER BY label ASC;', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/marque', (req, res) => {
  db.query('SELECT id, label FROM dressup_marque ORDER BY label ASC;', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur backend lancé sur http://localhost:${PORT}`));