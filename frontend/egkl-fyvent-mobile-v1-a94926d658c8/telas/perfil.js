import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Perfil extends Component {
  static navigationOptions = {
    title: 'Meu Perfil',
    headerTintColor: '#ddb66c',
    headerStyle: {
      backgroundColor: '#141414'
    }
  };

  render() {
    return (
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: 'https://avatar.leagueoflegends.com/EUW/The%20Storms%20Fury.png' }} />
        <View style={styles.info}>
          <Text style={styles.nome}>Nome do Usuario</Text>
        </View>
        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botao}
          >
            <View style={styles.icone} >
              <Icon color="#ffffff" name="restore" />
            </View>
            <Text style={styles.textoBotao}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('CriarEvento')}
            style={styles.botao}
          >
            <View style={styles.icone} >
              <Icon color="#ffffff" name="add" />
            </View>
            <Text style={styles.textoBotao}>Criar Evento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao}>
            <View style={styles.icone} >
              <Icon color="#ffffff" name="person-pin-circle" />
            </View>
            <Text style={styles.textoBotao}>Meus Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.botao}
          onPress={() => this.props.navigation.navigate('Preferencias')}
          >
            <View style={styles.icone} >
              <Icon color="#ffffff" name="settings" />
            </View>
            <Text style={styles.textoBotao}>Preferencias</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f3f3f',
    height: '100%',
  },
  info: {
    paddingTop: 10,
  },
  nome: {
    fontSize: 20,
    color: 'white',
  },
  botoes: {
    width: '100%',
    padding: 10,
  },
  botao: {
    flexDirection: 'row',
    padding: 10,
  },
  textoBotao: {
    fontSize: 20,
    color: 'white',
  },
  icone: {
    marginRight: 10,
  },
}); 
