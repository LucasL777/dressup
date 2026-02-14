const express = require('express');
const router = express.Router();
const outfitsController = require('../controllers/outfits.controller');

router.get('/', outfitsController.getOutfits);

module.exports = router;
