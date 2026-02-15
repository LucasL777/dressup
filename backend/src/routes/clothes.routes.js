const express = require('express');
const router = express.Router();
const clothesController = require('../controllers/clothes.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

router.get('/', isAuthenticated, clothesController.getClothes);
router.post('/', isAuthenticated, clothesController.addCloth);
router.put('/:id', isAuthenticated, clothesController.updateCloth);

module.exports = router;
