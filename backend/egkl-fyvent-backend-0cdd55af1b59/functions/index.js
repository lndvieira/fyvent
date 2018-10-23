'use strict';

const functions = require('firebase-functions');

const eventos = require('./services/eventos');
const storage = require('./services/storage');
const sentiments = require('./services/sentiments');

// CRUD DE EVENTOS (FIREBASE)
exports.eventos = functions.https.onRequest(eventos);

// STORAGE (FIREBASE)
exports.storage = functions.https.onRequest(storage);

// SENTIMENTS (AZURE)
exports.sentiments = functions.https.onRequest(sentiments);
