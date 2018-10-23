const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const helper = require('./helpers');

// Azure config
const PRHASES = '/text/analytics/v2.0/keyPhrases';
const SENTIMENT = '/text/analytics/v2.0/sentiment';
const LANGUAGES = '/text/analytics/v2.0/languages';
const ACESS_KEY = '8c46514faebd4dffbb6d242f3cca794a';
const API_URL = 'https://brazilsouth.api.cognitive.microsoft.com';

// Init express
const app = express();
app.use(bodyParser.json());

// Axios config
const CONFIG = {
  headers: {
    'Ocp-Apim-Subscription-Key': ACESS_KEY,
  },
};

// GET LANGUAGE (DOCUMENTS)
app.post('/language', (req, res) => {
  const data = req.body;

  if (!helper.isEmpty(data))
    getLanguage(data, (data) => (res.status(200).send(data)));
  else
    res.status(500).send('Erro na requisição, um objeto DOCUMENTS é esperado!');
});

// GET SENTIMENTS (DOCUMENTS)
app.post('/sentiment', (req, res) => {
  const data = req.body;

  if (!helper.isEmpty(data))
    getSentiment(data, (data) => (res.status(200).send(data)));
  else
    res.status(500).send('Erro na requisição, um objeto DOCUMENTS é esperado!');
});

// GET KEY PHRASES (DOCUMENTS)
app.post('/phrases', (req, res) => {
  const data = req.body;

  if (!helper.isEmpty(data))
    getKeyPhrases(data, (data) => (res.status(200).send(data)));
  else
    res.status(500).send('Erro na requisição, um objeto DOCUMENTS é esperado!');
});

function getLanguage(documents, callback) {
  const URL = API_URL + LANGUAGES;  
  
  axios.post(URL, documents, CONFIG)
    .then(({ data }) => {
      callback(data.documents[0].detectedLanguages[0]);
    })
    .catch((error) => console.log(error));
}

function getSentiment(documents, callback) {
  const URL = API_URL + SENTIMENT;
  
  axios.post(URL, documents, CONFIG)
    .then(({ data }) => {
      callback(data.documents[0]);
    })
    .catch((error) => console.log(error));
}

function getKeyPhrases(documents, callback) {
  const URL = API_URL + PRHASES;

  axios.post(URL, documents, CONFIG)
    .then(({ data }) => {
      callback(data.documents[0]);
    })
    .catch((error) => console.log(error));
}

// TESTS
// const documents = { 
// 	'documents': [{ 
// 		'id': '1', 
//     'text': 'O café é péssimo, o bolo também!' 
// 	}]
// };

// getKeyPhrases(documents);

// LOCALHOST
// const server = sentiments.listen(3000, () => {
//   console.log('localhost:', server.address().port);
// });

module.exports = app;