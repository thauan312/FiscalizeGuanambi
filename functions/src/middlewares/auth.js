// Keys
const serviceAccount = require('../keys/serviceAccountKey.json');

// JWT
const jwt = require('jsonwebtoken');

// Utils
const NodeRSA = require('node-rsa');

/**
 * Validar sessão do usuário
 *
 */
exports.validateSession = async (req, res, next) => {
  init();

  function init() {
    validateHeader();
  }

  function validateHeader() {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(200)
        .send({ success: false, message: 'Nenhum token fornecido' });
    }

    const token = authorization.split('Bearer ')[1].trim();
    validateSession(token);
  }

  function validateSession(token) {
    const publicKey = new NodeRSA()
      .importKey(serviceAccount.private_key, 'pkcs8-private-pem')
      .exportKey('pkcs8-public-pem');

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, err => {
      if (err) {
        return res
          .status(200)
          .send({ success: false, message: 'Sessão inválida' });
      }
      next();
    });
  }
};
