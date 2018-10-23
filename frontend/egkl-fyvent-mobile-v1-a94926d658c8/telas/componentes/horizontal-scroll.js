import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import Card from './menu-item';

const clubImg = require('../../assets/club.jpg');
const showImg = require('../../assets/show.jpg');
const teatroImg = require('../../assets/teatro.jpg');

class HorizontalScroll extends Component {
  render() {
    const { onPress } = this.props;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: '#3f3f3f',
          width: '100%',
          height: 157,
          flexDirection: 'row',
          elevation: 50,
        }}
      >
        <TouchableOpacity onPress={() => onPress('Home')}>
          <Card text="Home" source={teatroImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('Rock')}>
          <Card text="rock" source={clubImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('Standup')}>
          <Card text="StandUP" source={showImg} />
        </TouchableOpacity>
      </ScrollView >
    );
  }
}

export default HorizontalScroll;
