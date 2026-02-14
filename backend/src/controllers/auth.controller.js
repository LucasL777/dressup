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
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json(req.session.user);
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }

    res.clearCookie("connect.sid"); // nom du cookie par défaut
    res.json({ message: "Déconnexion réussie" });
  });
};
