import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    marginHorizontal: 5,
    marginTop: 5,
  },
  imagem: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    width: 150,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  }
});

class MenuItem extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Image style={styles.imagem} source={this.props.source} />
        <View style={styles.centerText}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

export default MenuItem;
