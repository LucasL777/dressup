const db = require('../../db');

exports.getTypes = (req, res) => {
  db.query(
    'SELECT id, label FROM dressup_type ORDER BY label ASC;',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getCouleurs = (req, res) => {
  db.query(
    'SELECT id, label FROM dressup_couleur ORDER BY label ASC;',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getTailles = (req, res) => {
  db.query(
    'SELECT id, label FROM dressup_taille ORDER BY label ASC;',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getMarques = (req, res) => {
  db.query(
    'SELECT id, label FROM dressup_marque ORDER BY label ASC;',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
