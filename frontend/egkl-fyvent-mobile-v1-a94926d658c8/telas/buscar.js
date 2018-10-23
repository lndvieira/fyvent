import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  SearchBar,
  Avatar,
} from 'react-native-elements';

import axios from 'axios';
import Evento from './componentes/cardEvento';
import HorizontalScroll from './componentes/horizontal-scroll';


export default class Eventos extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Olá, Usuario',
    headerRight: <View style={{ paddingRight: 20 }}>
      <Avatar
        small
        rounded
        title="Usr"
        activeOpacity={1}
        onPress={() => navigation.navigate('Perfil')}
      />
    </View>,
    headerTintColor: '#ddb66c',
    headerStyle: {
      backgroundColor: '#141414'
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    axios.get('https://us-central1-fyvent.cloudfunctions.net/eventos/')
      .then((response) => {
        this.setState({ evento: response.data, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectTag = (param) => {
    console.log(param);

    this.setState({ evento: null, isLoading: true });

    if (param === 'Home') {
      axios.get('https://us-central1-fyvent.cloudfunctions.net/eventos/')
        .then((response) => {
          this.setState({ evento: response.data, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.get(`https://us-central1-fyvent.cloudfunctions.net/eventos/tags/${param}`)
        .then((response) => {
          this.setState({ evento: response.data, isLoading: false });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <SearchBar
            round
            placeholder="Pesquisa"
          />
          <HorizontalScroll onPress={this.selectTag} />
          <View style={{ flex: 1, padding: 40 }}>
            <ActivityIndicator size='large' />
          </View>
        </View>
      );
    }


    const events = Object.entries(this.state.evento);
    console.log(events);

    return (
      <View style={styles.container}>
        <SearchBar
          round
          placeholder="Pesquisa"
        />
        <HorizontalScroll onPress={this.selectTag} />
        <ScrollView style={styles.scrollView}>
          {events.map((evento) => <Evento
            key={evento[0]}
            capa={evento[1].capa}
            onPress={() => this.props.navigation.navigate('Evento', { id: evento[1].key })}
            nome={evento[1].nome}
          />)}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#3f3f3f',
  },
  container: {
    flex: 1,
  },
});
