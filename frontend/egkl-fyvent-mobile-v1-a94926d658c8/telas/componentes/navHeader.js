import React, { Component } from 'react';
import { View,
   TextInput,
    StyleSheet
   } from 'react-native';


export default class navHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput placeholder='Search' style={styles.searchBar} />
      </View>
    );
  }

}
const styles = StyleSheet.create({

  searchBar: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  header: {
    backgroundColor: 'white',
    shadowOffset: { width: 10, height: 20 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 5,
  }

}); 
