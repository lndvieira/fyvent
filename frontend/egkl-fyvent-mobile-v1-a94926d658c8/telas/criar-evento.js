import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f3f3f',
    width: '100%'
  },
  linha: {
    flexDirection: 'row',
    width: '100%',
  },
  tresSpacos: {
    flex: 3,
  },
  doisEspacos: {
    flex: 2,
  },
  backgroundButton: {
    backgroundColor: '#ddb66c',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    marginHorizontal: 10,
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3f3f',
    padding: 10,
    borderRadius: 5,
  },
});

const config = {
  apiKey: "AIzaSyDmj-wG5pEzp_FxdFjMkzCORXTBUY1wIAU",
  authDomain: "fyvent.firebaseapp.com",
  databaseURL: "https://fyvent.firebaseio.com",
  projectId: "fyvent",
  storageBucket: "fyvent.appspot.com",
  messagingSenderId: "213021353351"
};

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

firebase.initializeApp(config);

class CriarEvento extends Component {
  static navigationOptions = {
    title: 'Novo Evento',
    headerTintColor: '#ddb66c',
    headerStyle: {
      backgroundColor: '#141414'
    }
  };

  constructor(props) {
    super(props);

    const evento = {
      data: 1544753437000,
      capa: null,
      descricao: null,
      genero: null,
      horario: { inicio: null, fim: null },
      nome: null,
      preco: 'Gratuito',
      privacidade: null,
      realizadores: null,
      tags: null,
    };

    this.state = {
      evento,
      capa: null,
    };
  }

  handleCriarEvento = async () => {
         this.uploadImage(this.state.capa, this.state.evento.nome)
          .then(() => {
   // this.postEvento();
         })
          .catch((error) => {
            Alert.alert(error);
          }); 
  };

  postEvento = () => {
    axios.post('https://us-central1-fyvent.cloudfunctions.net/eventos/', this.state.evento)
      .then(res => {
        console.log('deucerto?', res);
        console.log('não', res.data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };


  handlePressCapa = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      this.setState({ capa: response.uri });
    });
  };

  uploadImage = async (uri, nome) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`eventos/${nome}`);
    console.log(ref);
    return ref.put(blob);
  };

  render() {
    const { evento } = this.state;
    console.log(evento)
    return (
      <ScrollView style={styles.container} >
        <KeyboardAvoidingView style={styles.container}>
          <FormLabel>
            Nome Do Evento
          </FormLabel>
          <FormInput
            placeholder="Digite o nome do evento"
            onChangeText={(text) => {
              evento.nome = text;
              this.setState({ evento });
            }}
          />
          <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
          <FormLabel>
            Descrição
          </FormLabel>
          <FormInput
            onChangeText={(text) => {
              evento.descricao = text;
              this.setState({ evento });
            }}
            placeholder="Digite a descrição do evento"
            multiline
            numberOfLines={4}
          />
          <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
          <FormLabel>
            Endereço
          </FormLabel>
          <View style={styles.linha}>
            <View style={styles.tresSpacos}>
              <FormInput placeholder="digita o nome da rua" />
              <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
            </View>
            <View style={styles.doisEspacos}>
              <FormInput placeholder="Nº" />
              <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
            </View>
          </View>
          <View style={styles.linha}>
            <View style={styles.tresSpacos}>
              <FormLabel>
                Cidade
              </FormLabel>
              <FormInput placeholder="Digite a cidade" />
              <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
            </View>
            <View style={styles.tresSpacos}>
              <FormLabel>
                Estado
              </FormLabel>
              <FormInput placeholder="Digite o estado" />
              <FormValidationMessage>Campo Obrigatorio</FormValidationMessage>
            </View>
          </View>
          <View style={{ marginHorizontal: 10 }} >
            <View style={{ backgroundColor: '#ddb66c', borderRadius: 5, width: '100%', marginTop: 10 }} >
              <TouchableOpacity
                style={styles.botao}
                onPress={this.handlePressCapa}
              >
                <Text style={styles.textBtn}>Colocar capa</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#ddb66c', borderRadius: 5, width: '100%', marginTop: 10 }} >
              <TouchableOpacity
                style={styles.botao}
                onPress={this.handleCriarEvento}
              >
                <Text style={styles.textBtn}>Criar evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

//https://medium.com/@davidjsehl/react-native-and-the-infamous-blob-uploading-images-to-firebase-b1a440f9e078

export default CriarEvento;
