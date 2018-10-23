import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Slider,
  Text,
  Picker,
} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f3f3f',
  },
});

class Preferencias extends Component {
  static navigationOptions = {
    title: 'Minhas Preferencias',
    headerTintColor: '#ddb66c',
    headerStyle: {
      backgroundColor: '#141414'
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      range: 5,
      gostos: [],
    };
  }

  render() {
    const { range, gostos } = this.state;
    console.log(gostos);
    return (
      <View style={styles.container}>
        <Text>Distancia</Text>
        <Slider
          value={range}
          maximumValue={100}
          minimumValue={1}
          onValueChange={value => this.setState({ range: value })}
          thumbTintColor="#ddb66c"
          maximumTrackTintColor="#ff3f3f"
          minimumTrackTintColor="#ddb66c"
        />
        <Text>{_.round(range)} {_.round(range) > 1 ? 'kms' : 'km'}</Text>
        <Text>Preferencias</Text>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => this.setState({ ...gostos, itemValue })}
        >
          <Picker.Item label="Rock" value="rock" />
          <Picker.Item label="Comedia" value="comedia" />
          <Picker.Item label="Balada" value="Balada" />
          <Picker.Item label="Show" value="Show" />
          <Picker.Item label="OpenBar" value="OpenBar" />
        </Picker>
      </View>
    );
  }
}

export default Preferencias;
