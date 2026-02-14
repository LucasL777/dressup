const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists.controller');

router.get('/types', listsController.getTypes);
router.get('/couleurs', listsController.getCouleurs);
router.get('/tailles', listsController.getTailles);
router.get('/marques', listsController.getMarques);

module.exports = router;
