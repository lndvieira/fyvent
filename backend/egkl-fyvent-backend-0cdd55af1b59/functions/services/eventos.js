'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const helper = require('./helpers');
const firebase = require('./firebase');
const REFERENCE = require('./references');

// Init database and express
const db = firebase.database();
const app = express();
app.use(bodyParser.json());

// GET EVENTOS
app.get('/', (_, res) => {
  const ref = db.ref(REFERENCE.EVENTOS);
  
  ref.orderByChild('data').once('value')
    .then((snap) => {
      if (snap.val())
        // retorna um array de eventos ordenados por data (desc)
        res.status(200).send(helper.snapToArray(snap).reverse());
      else
        res.status(404).send('Nenhum evento encontrado!');
    })
    .catch((error) => res.status(500).send(error));
});

// GET EVENTO (ID)
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const ref = db.ref(`${REFERENCE.EVENTOS}${id}/`);
 
  ref.once('value')
    .then((snap) => {
      const evento = snap.val();
      
      if (evento)
        res.status(200).send(evento);
      else
        res.status(404).send('Evento não encontrado!');
    })
    .catch((error) => res.status(500).send(error));
});

// CREATE EVENTO (EVENTO)
app.post('/', (req, res) => {
  const data = req.body;
  const ref = db.ref(REFERENCE.EVENTOS);
  
  if (!helper.isEmpty(data)) {
    const evento = ref.push();
    
    // Seta a capa padrão
    data.capa = REFERENCE.CAPA_DEFAULT;

    // Verifica se o evento esta ativo
    if (data.horario.fim) {
      const horaFinal = data.horario.fim.split(':')[0];
      const minutoFinal = data.horario.fim.split(':')[1]; 
      data.isAtivo = helper.isEventoAtivo(data.data, horaFinal, minutoFinal);
    }

    evento.set(data);
    
    res.status(200).send(evento.key);
  } else {
    res.status(400).send('Erro na requisição, um objeto EVENTO é esperado!');
  }
});

// UPDATE EVENTO (EVENTO)
app.put('/:id', (req, res) => {
  const evento = req.body;
  
  if (!helper.isEmpty(evento)) {
    const id = req.params.id;
    const ref = db.ref(REFERENCE.EVENTOS + id);
    
    ref.update(evento);
    
    ref.once('value')
      .then((snap) => res.send(snap.val()))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(400).send('Erro na requisição, um objeto EVENTO é esperado!');
  }
});

// DELETE EVENTO (ID)
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const ref = db.ref(`${REFERENCE.EVENTOS}${id}/`);
  
  ref.remove()
    .then(() => {
      res.status(200).send('Evento removido com sucesso!');
    })
    .catch((error) => res.status(500).send(error));
});

// GET EVENTOS (TAG)
app.get('/tags/:tag', (req, res) => {
  const tag = req.params.tag;
  const ref = db.ref(REFERENCE.EVENTOS);

  ref.once('value')
    .then((snap) => {
      const eventos = helper.eventHasTag(helper.snapToArray(snap).reverse(), tag);

      if (eventos.length > 0)
        res.status(200).send(eventos);
      else
        res.status(404).send(`Eventos com a tag "${tag}" não encontrados!`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error)
    });
});

// GET EVENTOS (TITULO)
app.get('/busca/:nome', (req, res) => {
  const nome = req.params.nome;
  const ref = db.ref(REFERENCE.EVENTOS);

  ref.once('value')
    .then((snap) => {
      const eventos = helper.eventHasTitle(helper.snapToArray(snap).reverse(), nome);

      if (eventos.length > 0)
        res.status(200).send(eventos);
      else
        res.status(404).send(`Nenhum evento encontrado!`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error)
    });
});

// GET EVENTOS (DISTANCIA)
app.post('/nearby', (req, res) => {
  const { definedPos, distace } = req.body;
  const ref = db.ref(REFERENCE.EVENTOS);

  ref.once('value')
    .then((snap) => {
      const eventos = helper.nearbyEvents(helper.snapToArray(snap).reverse(), definedPos, distace);

      if (eventos.length > 0)
        res.status(200).send(eventos);
      else
        res.status(404).send('Nenhum evento próximo encontrado!');
    })
    .catch((error) => res.status(500).send(error));
});

// LOCALHOST
// const server = app.listen(3000, () => {
//   console.log('localhost:', server.address().port);
// });

module.exports = app;
