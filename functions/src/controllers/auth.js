// Firebase
const firebase = require('../config/firebase');
const auth = firebase.auth();
const db = firebase.db();

// Validações
const { Validator } = require('node-input-validator');

/**
 * Loga o usuário
 *
 */
exports.login = async (req, res) => {
  init();

  function init() {
    validateFields();
  }

  function validateFields() {
    const { body } = req;

    const validator = new Validator(body, {
      email: 'required|email',
      password: 'required|minLength:6'
    });

    validator
      .check()
      .then(matched => {
        if (!matched) {
          const { errors } = validator;

          return res
            .status(200)
            .send({ success: false, message: 'Campos inválidos!', errors });
        }

        getUserByEmail(body.email);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function getUserByEmail(email) {
    auth
      .getUserByEmail(email)
      .then(userRecord => {
        const { uid } = userRecord.toJSON();

        getUserData(uid);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function getUserData(uid) {
    const docRef = db.collection('users').doc(uid);

    docRef
      .get()
      .then(doc => {
        const userData = { ...doc.data(), uid };

        createUserJWT(userData);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function createUserJWT(userData) {
    const { uid } = userData;

    auth
      .createCustomToken(uid)
      .then(customToken => {
        return res.status(200).send({
          success: true,
          data: { user: userData, token: customToken }
        });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};

/**
 * Registra uma usuário novo
 *
 */
exports.register = async (req, res) => {
  init();

  function init() {
    validateAddress();
  }

  function validateAddress() {
    const { address } = req.body;

    const validator = new Validator(address, {
      city: 'required|string',
      district: 'required|string',
      number: 'required|string',
      postcode: 'required|string',
      road: 'required|string',
      state: 'required|string'
    });

    validator
      .check()
      .then(matched => {
        if (!matched) {
          const { errors } = validator;

          return res
            .status(200)
            .send({ success: false, message: 'Campos inválidos!', errors });
        }

        validatePersonalData();
      })
      .catch(error => {
        return res.status(200).send({
          success: false,
          message: error.message || error
        });
      });
  }

  function validatePersonalData() {
    const { personalData } = req.body;

    const validator = new Validator(personalData, {
      name: 'required|string',
      email: 'required|email',
      password: 'required|minLength:6'
    });

    validator
      .check()
      .then(matched => {
        if (!matched) {
          const { errors } = validator;

          return res
            .status(200)
            .send({ success: false, message: 'Campos inválidos!', errors });
        }

        createUser();
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function createUser() {
    const { email, password } = req.body.personalData;

    auth
      .createUser({ email, password })
      .then(({ uid }) => {
        mountData(uid);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function mountData(uid) {
    const { personalData, ...rest } = req.body;

    const newUser = {
      ...rest,
      personalData: {
        createdAt: firebase.db.Timestamp.fromDate(new Date()),
        name: personalData.name,
        email: personalData.email
      },
      settings: {
        role: 'user',
        status: true
      }
    };

    saveUserDB(newUser, uid);
  }

  function saveUserDB(userData, uid) {
    const collectionRef = db.collection('users');

    collectionRef
      .doc(`${uid}`)
      .set(userData)
      .then(() => {
        createUserJWT({ ...userData, uid });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function createUserJWT(userData) {
    const { uid } = userData;

    auth
      .createCustomToken(uid)
      .then(customToken => {
        return res.status(200).send({
          success: true,
          data: { user: userData, token: customToken }
        });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};
