const express = require('express');
const router = express.Router();

// Controllers
const claimsController = require('../controllers/claims');

// Middlewares
const authMiddlewares = require('../middlewares/auth');

// Busca as reclamações
router.get('/search', authMiddlewares.validateSession, claimsController.search);

// Busca reclamação por id
router.get(
  '/search/:id',
  authMiddlewares.validateSession,
  claimsController.searchById
);

// Cria uma reclamação
router.post(
  '/create',
  authMiddlewares.validateSession,
  claimsController.create
);

// Apaga uma reclamação
router.delete('/:id', authMiddlewares.validateSession, claimsController.delete);

module.exports = router;
