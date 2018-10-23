import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './telas/login';
import Evento from './telas/evento';
import Principal from './telas/buscar';
import Perfil from './telas/perfil';
import CriarEvento from './telas/criar-evento';

const App = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Principal: {
    screen: Principal,
  },
  CriarEvento: {
    screen: CriarEvento,
  },
  Perfil: {
    screen: Perfil,
  },
  Evento: {
    screen: Evento,
    navigationOptions: {
      headerTintColor: '#ddb66c',
      headerStyle: {
        backgroundColor: '#141414'
      }
    }
  },
});


class IndexApp extends Component {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <App />
        <StatusBar
          backgroundColor="#141414"
          barStyle="light-content"
        />
      </View>
    );
  }
}

export default IndexApp;
