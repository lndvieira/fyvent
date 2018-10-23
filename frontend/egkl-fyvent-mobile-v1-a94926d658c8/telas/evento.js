import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Evento extends Component {
  static navigationOptions = {
    title: 'Evento',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = {

      isLoading: true,
      id: navigation.getParam('id'),
    };
  }

  componentWillMount() { // colocar no construtor
    
    return fetch('https://fyvent.firebaseio.com/eventos/' + this.state.id + '.json') // arrumar 'fetch'
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          evento: responseJson,
        },
          function () { });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 40 }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    const { evento } = this.state;
    console.log(evento);
    return (
      <ScrollView style={styles.view}>
        <Image source={{ uri: evento.capa }} style={styles.imagem} />
        <Text style={styles.nome} >{evento.nome}</Text>
        <Text style={styles.desc}>{evento.descricao}</Text>
        <View style={styles.infos}>
          <View style={styles.info}>
            <Icon
              name="access-time"
              color="white"
            />
            <Text style={styles.infoText}>Inicio: {evento.horario.inicio} Fim: {evento.horario.fim}</Text>
          </View>
          <View style={styles.info}>
            <Icon
              name="today"
              color="white"
            />
            <Text style={styles.infoText}>Data: {evento.data}</Text>
          </View>
          <View style={styles.info}>
            <Icon
              name="place"
              color="white"
            />
            <Text style={styles.infoText}>Endereço: {evento.local.endereco}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#2a2a2a'
  },
  imagem: {
    width: 360,
    height: 202,
  },
  nome: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#e8e8e8',
  },
  infos: {
    width: '100%',
    padding: 10,
  },
  info: {
    flexDirection: 'row',
    width: '100%'
  },
  infoText: {
    color: 'white',
    width: '90%'
  }, 
  desc: {
    padding: 10,
    color: '#e8e8e8',
  },
  btn: {
    padding: 5,
    backgroundColor: '#ff3f3f',
    alignItems: 'center',
    margin: 10,
  },
});
