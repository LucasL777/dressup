const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

router.post('/login', authController.login);
router.get('/me', isAuthenticated, authController.getMe);

module.exports = router;
