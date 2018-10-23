import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class cardEvento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: { x: 0, Y: 0 },
    };
  }


  render() {
    return (
      <View>
        <TouchableWithoutFeedback style={styles.card} onPress={this.props.onPress}>
          <View>
            <View style={styles.conteinerImagem}>
              <Image
                style={styles.eventoImagem}
                resizeMode="cover"
                source={{ uri: this.props.capa }}
              />
            </View>
            <View style={styles.conteinerInfo} >
              <Text style={styles.nome}>{this.props.nome}</Text>
              <Text style={styles.info}>Dia: {this.props.dia} as: {this.props.hora}</Text>
            </View>
            <View style={styles.cardInfos}>
              <Animated.View style={styles.cardInfos} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.divider} />
      </View>
    );
  }
}
const styles = StyleSheet.create({

  card: {
    backgroundColor: '#3f3f3f',
    flexDirection: 'row',
    height: 170,
  },
  eventoImagem: {
    height: '100%',
    width: '100%',
  },
  cardInfos: {
    position: 'absolute',
    height: 170,
    width: '200%',
  },
  conteinerInfo: {
    position: 'absolute',
    padding: 10,
    paddingTop: 110,
  },
  conteinerImagem: {
    width: '100%',
    height: 170,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#141414',
    margin: 0,
    padding: 0,
  },
  nome: {
    color: '#e8e8e8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    color: '#e8e8e8',
    fontSize: 17
  }
});

