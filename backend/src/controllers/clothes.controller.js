const db = require('../../db');

exports.getClothes = (req, res) => {
  db.query(
    'SELECT type_label, color_label, size_label, marque_label FROM habits WHERE id_user = ?;',
    [req.session.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.addCloth = (req, res) => {
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
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        `SELECT type_label, color_label, size_label, marque_label
         FROM habits
         WHERE id_user = ? AND id = ?`,
        [req.session.user.id, results.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json(rows[0]);
        }
      );
    }
  );
};


exports.updateCloth = (req, res) => {
  const clothId = req.params.id;

  db.query(
    `UPDATE dressup_clothes 
     SET type = ?, size = ?, color = ?, marque = ?
     WHERE id = ? AND id_user = ?`,
    [
      req.body.type,
      req.body.taille,
      req.body.color,
      req.body.marque,
      clothId,
      req.session.user.id
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // on renvoie l'objet mis à jour
      db.query(
        `SELECT type_label, color_label, size_label, marque_label FROM habits WHERE id_user = ? AND id = ?`,
        [req.session.user.id, clothId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json(rows[0]);
        }
      );
    }
  );
};

