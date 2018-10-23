'use strict';

const axios =  require('axios');

const API_URL = 'https://us-central1-fyvent.cloudfunctions.net/eventos/';

// GET EVENTOS
axios.get(API_URL)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// GET EVENTO (ID)
const ID = '-LOzOffNo_fortuubnyB'; // ID DE UM EVENTO EXISTENTE

axios.get(API_URL + ID)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// CREATE EVENTO (EVENTO)
const EVENTO = {
  "data" : 1544753437000,
  "descricao" : "Lorem ipsum lorem lorem",
  "genero" : "Teste",
  "horario" : {
    "fim" : "18:00",
    "inicio" : "12:00"
  },
  "local" : {
    "endereco" : "Avenida Paulista, 1313, 01311-200 São Paulo",
    "geolocalizacao" : {
      "latitude" : -23.5634,
      "longitude" : -46.6544098
    },
    "nome" : "Centro Cultural Fiesp"
  },
  "nome" : "Teste",
  "preco" : "Gratuito",
  "privacidade" : "Público",
  "realizadores" : ["Centro Cultural Fiesp" ],
  "tags" : [ "Teste" ]
};

axios.post(API_URL, EVENTO)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// UPDATE EVENTO (EVENTO)
const ID_2 = '-LOzeVLQUea7O7RYfplv'; // ID DE UM EVENTO EXISTENTE
const EVENTO_MOD = {
 "nome": "Teste 4" 
};

axios.put(API_URL + ID_2, EVENTO_MOD)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// DELETE EVENTO (ID)
axios.delete(API_URL + ID_2)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
