import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import axios from "axios";

export default class App extends React.Component {

  state = {
    sliderValue:0,
  }



  changeValue(sliderValue){
    this.setState({
      sliderValue: sliderValue
    })
    console.log(this.state.sliderValue)
  }

  async UploadValue(){
    /* fetch("http://localhost:5000/raindrop", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          comm: "hola",
          sliderValue: this.state.sliderValue
      }) */
      

      axios.post('http://192.168.0.118:5000/raindrop', {
        Request: "Pub",
        Feed: "threshold",
        Value: this.state.sliderValue
      })
  }
  

render(){

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RainDrop</Text>
      <Slider
      style={{width: 300, height: 40}}
      maximumValue={100}
      minimumValue={1}
      step={1}
      value={50}
      value={this.state.sliderValue}
      onValueChange={(sliderValue) => this.changeValue(sliderValue)}
  />
  <Text style={styles.valuetext}>{this.state.sliderValue}</Text>
      <TouchableOpacity style={styles.button} onPress = {(value) => this.UploadValue()}>
        <Text style ={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 40,
    bottom:30
  },
  button:{
    width:250,
    height:54,
    borderRadius:62,
    backgroundColor:"#191c1a",
    alignItems: 'center',
    marginTop:40
  },
  buttonText:{
    color:"#fff",
    position:"absolute",
    textAlign:"center",
    fontSize:26,
    paddingTop:10
  },
  trackStyle:{
    color:"#000000"
  },
  valuetext:{
    fontSize:25
  }
});
