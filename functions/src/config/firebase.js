const firebaseApp = require('firebase-admin');
const serviceAccount = require('../keys/serviceAccountKey.json');

firebaseApp.initializeApp({
  credential: firebaseApp.credential.cert(serviceAccount),
  storageBucket: 'fiscaliza-guanambi'
});

module.exports = {
  auth: firebaseApp.auth,
  db: firebaseApp.firestore,
  storage: firebaseApp.storage
};
