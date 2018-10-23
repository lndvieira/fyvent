'use strict';

const fileMiddleware = require('express-multipart-file-parser');
const { Storage } = require('@google-cloud/storage');
const format = require('util').format;
const express = require('express');

const firebase = require('./firebase');
const REFERENCE = require('./references');

// Cloud Storag setup
const storage = new Storage({
  projectId: 'fyvent',
  keyFilename: 'serviceAccountKey.json',
});

const bucket = storage.bucket('fyvent.appspot.com');

// Init database and express
const db = firebase.database();
const app = express();
app.use(fileMiddleware);

// UPLOAD CAPA EVENTO (IMAGE)
app.post('/capa/:id', (req, res) => {
  const file = req.files[0];
  const id = req.params.id;
  const dir = 'eventos'

  if (file) {
    uploadImageToStorage(file, dir)
      .then((url) => {
        const ref = db.ref(REFERENCE.EVENTOS + id);
        const evento = { capa: url };
        
        ref.update(evento)
          .then(() => {
            res.status(200).send('Upload feito com sucesso!');
          })
          .catch((error) => res.status(500).send(error));
    }).catch((error) => res.status(500).send(error));
  }
});

const uploadImageToStorage = (file, dir) => {
  const prom = new Promise((resolve, reject) => {
    if (!file)
      reject('Nenhuma imagem selecionada!');

    const newFileName = `${dir}/${file.originalname}_${Date.now()}`;

    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Algo de errado aconteceu, tente novamente mais tarde!');
    });

    blobStream.on('finish', () => {
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
  return prom;
}

// LOCALHOST
// app.listen(3000, () => {
//   console.log('App listening to port 3000');
// });

module.exports = app;
