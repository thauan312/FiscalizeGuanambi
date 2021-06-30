// Firebase
const firebase = require('../config/firebase');
const db = firebase.db();
const bucket = firebase.storage().bucket();

// Validações
const { Validator } = require('node-input-validator');

// Utils
const { v4: uuidv4 } = require('uuid');

/**
 * Busca as reclamações
 *
 */
exports.search = async (req, res) => {
  init();

  function init() {
    getClaims();
  }

  function getClaims() {
    const collectionsRef = db.collection('claims');

    collectionsRef
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          return res.status(200).send({
            success: false,
            message: 'Nenhuma reclamação encontrada.'
          });
        }

        const claims = [];
        querySnapshot.forEach(doc => {
          claims.push({ ...doc.data(), id: doc.id });
        });

        return res
          .status(200)
          .send({ success: true, data: { claims: claims } });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};

/**
 * Busca as reclamações
 *
 */
exports.searchById = async (req, res) => {
  init();

  function init() {
    validateFields();
  }

  function validateFields() {
    const { params } = req;

    const validator = new Validator(params, {
      id: 'required|string'
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

        getClaimById(params.id);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function getClaimById(docId) {
    const docRef = db.collection('claims').doc(docId);

    docRef
      .get()
      .then(doc => {
        const claimData = { ...doc.data(), id: doc.id };

        return res.status(200).send({ success: true, data: claimData });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};

/**
 * Cria uma nova reclamação
 *
 */
exports.create = async (req, res) => {
  init();

  function init() {
    validateFields();
  }

  function validateFields() {
    const validator = new Validator(req.body, {
      address: 'required|string',
      title: 'required|string',
      description: 'required|string',
      media: 'required|object'
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

        generateDocId();
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function generateDocId() {
    const docId = db.collection('claims').doc().id;
    req.body.docId = docId;

    handleUploadMedias();
  }

  async function handleUploadMedias() {
    const { media, docId } = req.body;

    const downloadUrl = await uploadMediasBucket(media, docId);
    media.file = downloadUrl;

    mountData();
  }

  async function uploadMediasBucket(media, docId) {
    const { file: base64EncodedImageString, name, ext } = media;

    const uuid = uuidv4();

    const fileName = `claims/${docId}/${name}.${ext}`;
    const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
    const file = bucket.file(fileName);

    const url = file.save(
      imageBuffer,
      {
        metadata: { metadata: { firebaseStorageDownloadTokens: uuid } }
      },
      error => {
        if (error) {
          return '';
        }

        return `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
      }
    );

    return url;
  }

  function mountData() {
    const { docId, title, description, ...rest } = req.body;

    const newData = {
      ...rest,
      personalData: {
        createdAt: firebase.db.Timestamp.fromDate(new Date()),
        title,
        description
      }
    };

    saveClaimsDB(newData, docId);
  }

  function saveClaimsDB(claimData, docId) {
    const docRef = db.collection('claims').doc(docId);

    docRef
      .set(claimData)
      .then(() => {
        return res.status(200).send({ success: true, data: claimData });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};

/**
 * Apaga uma reclamação
 *
 */
exports.delete = async (req, res) => {
  init();

  function init() {
    validateFields();
  }

  function validateFields() {
    const { params } = req;

    const validator = new Validator(params, {
      id: 'required|string'
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

        deleteClaim(params.id);
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }

  function deleteClaim(docId) {
    const docRef = db.collection('claims').doc(docId);

    docRef
      .delete()
      .then(() => {
        return res
          .status(200)
          .send({ success: true, message: 'Reclamação excluída com sucesso' });
      })
      .catch(error => {
        return res
          .status(200)
          .send({ success: false, message: error.message || error });
      });
  }
};
