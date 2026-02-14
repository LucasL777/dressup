const db = require('../../db');

exports.getOutfits = (req, res) => {
  db.query(
    `SELECT type, color, marque
     FROM dressup_clothes
     JOIN dressup_composant 
       ON dressup_clothes.id = dressup_composant.id_cloth
     JOIN dressup_outfits 
       ON dressup_composant.id_outfit = dressup_outfits.id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
