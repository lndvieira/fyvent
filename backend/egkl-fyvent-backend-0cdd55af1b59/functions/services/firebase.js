const admin = require('firebase-admin');

// Firebase config
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fyvent.firebaseio.com',
});

module.exports = admin;
