const functions = require('firebase-functions');

// API
const app = require('./src/index');

module.exports = { api: functions.https.onRequest(app) };
