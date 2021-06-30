const express = require('express');
const cors = require('cors');

const app = express();

// Configurações iniciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./routes/auth');
const claimsRoutes = require('./routes/claims');

app.use('/auth', authRoutes);
app.use('/claims', claimsRoutes);

// Tratamento de error
app.use((req, res, next) => {
  const erro = new Error('Route not found.');
  erro.status = 404;

  next(erro);
});

app.use((error, req, res) => {
  res.status(error.status || 500);

  return res.send({ error: { mensage: error.message, status: error.status } });
});

module.exports = app;
