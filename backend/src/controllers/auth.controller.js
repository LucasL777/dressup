const db = require('../../db');

exports.login = (req, res) => {
  const { login } = req.body;

  db.query(
    'SELECT id, nom, prenom FROM dressup_user WHERE username = ?;',
    [login],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(401).json({ message: "Login incorrect" });
      }

      req.session.user = {
        id: results[0].id,
        nom: results[0].nom,
        prenom: results[0].prenom
      };

      res.json({
        message: "Connexion réussie",
        user: req.session.user
      });
    }
  );
};

exports.getMe = (req, res) => {
  res.json(req.session.user);
};
