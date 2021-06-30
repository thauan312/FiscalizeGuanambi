const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');

// Loga o usuario
router.post('/login', authController.login);

// Registra uma usuário novo
router.post('/register', authController.register);

module.exports = router;
