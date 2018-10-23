// converte um objeto snap (do firebase) para uma array de objetos
const snapToArray = (snap) => {
  const returnArr = [];

  snap.forEach((child) => {
    const item = child.val();
    item.key = child.key;
    returnArr.push(item);
  });

  return returnArr;
};

// verifica se um objeto está vázio
const isEmpty = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

const eventHasTag = (eventos, tag) => {
  const returnArr = eventos.filter((evento) => {
    return evento.tags.includes(tag);
  });

  return returnArr;
}

const eventHasTitle = (eventos, title) => {
  const returnArr = eventos.filter((evento) => {
    const eventoNome = evento.nome.toLowerCase(); 
    return eventoNome.includes(title.toLowerCase());
  });

  return returnArr;
}

const nearbyEvents = (eventos, definedPos, distance) => {
  const returnArr = [];

  let maxPos = { 'latitude': 0.0, 'longitude': 0.0 };
  let minPos = { 'latitude': 0.0, 'longitude': 0.0 };

  maxPos.latitude = definedPos.latitude + distance;
  maxPos.longitude = definedPos.longitude + distance;
  minPos.latitude = definedPos.latitude - distance;
  minPos.longitude = definedPos.longitude - distance;

  eventos.forEach((evento) => {
    if (evento.local.geolocalizacao.latitude <= maxPos.latitude &&
      evento.local.geolocalizacao.longitude <= maxPos.longitude &&
      evento.local.geolocalizacao.latitude >= minPos.latitude &&
      evento.local.geolocalizacao.latitude >= minPos.longitude) {
      returnArr.push(evento);
    }
  });

  return returnArr;
}

// verifica se data do evento está ativa
const isEventoAtivo = (data, horas, minutos) => {
  const dataAtual = Date.now();
  const horaAtual = new Date().getHours();
  const minutosAtual = new Date().getMinutes();

  if (dataAtual < Number(data)) return true;
  else if (dataAtual === Number(data)) {
    if (horaAtual <= horas) {
      return minutosAtual <= minutos;
    } else {
      return false;
    }
  }

  return false; 
}

module.exports = {
  isEmpty,
  snapToArray,
  eventHasTag,
  nearbyEvents,
  isEventoAtivo,
  eventHasTitle,
};
