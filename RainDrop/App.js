import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import axios from "axios";
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import { Card } from './components/Card'

//consdole.disableYellowBox = true;

export default class App extends React.Component {

  render() {

    return (
      <View>
        <Card />
      </View>
    );
  }
}


