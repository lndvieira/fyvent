import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {
  //reseta o stackNavigation para não voltar para a area de login
  resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: 'Principal' })
    ]
  });

  render() {
    return (
      //so pode ter um component no render
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.inputs} >
          <TextInput
            placeholder='E-mail'
            style={styles.entradaNome}
            underlineColorAndroid='#ff3f3f'
            selectionColor='#ddb66c'
          />
          <TextInput
            placeholder='Password'
            style={styles.entradaSenha}
            secureTextEntry
            underlineColorAndroid='#ff3f3f'
            selectionColor='#ddb66c'
          />
        </View>
        <View style={{ backgroundColor: '#ddb66c', borderRadius: 5, marginTop: 5, width: '100%' }} >
          <TouchableOpacity
            style={styles.botao}
            onPress={() => this.props.navigation.dispatch(this.resetAction)}
          >
            <Text style={styles.textBtn}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({

  barra: {
    marginHorizontal: 10,
    backgroundColor: '#3f3f3f'
  },
  entradaNome: {
    color: '#454545',
    marginTop: 10,
  },
  entradaSenha: {
    color: '#454545',
    marginTop: 10,
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3f3f',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#3f3f3f'
  },
  inputs: {
    width: '100%',

  }
});
    //https://www.youtube.com/watch?v=1xu1eeRCPEk
