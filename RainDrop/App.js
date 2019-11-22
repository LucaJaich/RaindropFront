import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import axios from "axios";
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';

console.disableYellowBox = true;

export default class App extends React.Component {

  state = {
    sliderValue:0,
    humidityValue:50,
  }

  async watering(value){
    axios.post('http://192.168.43.18:5000/raindrop', {
      Request: "water",
      Feed: "manualwater",
      Value: value
      })

      //async getHumidity(){
      /// colorado 
      axios.post('http://192.168.43.18:5000/raindrop')
      .then ((response) => {
        console.log("respuesta recibida: " + response)
      })
    
      /*
     const response = await fetch("http://192.168.0.83:4000/Humedad");
     const humedad = await response.json();
     this.setState({ humidityValue: humedad });
     console.log(this.state.humidityValue)
      */
  }

  changeValue(sliderValue){
    this.setState({
      sliderValue: sliderValue
    })
    console.log(this.state.sliderValue)
  }

  async UploadValue(){
    console.log("hola")
      axios.post('http://192.168.43.18:5000/raindrop', {
        Request: "Pub",
        Feed: "threshold",
        Value: this.state.sliderValue
      })
  }

  async UpdateHumidity() {
    axios.post('http://192.168.43.18:5000/humidity', {
        Request: "humedad",
        Feed: "humedad"
    })
    .then (response => {
      console.log(response.data.Value)
      this.setState({humidityValue: response.data.Value});
    })
  }

  componentDidMount(){
     this.timer = setInterval(() => this.UpdateHumidity(), 2000)
   }
  

render(){

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>RainDrop</Text>
      <AnimatedGaugeProgress
      size={200}
      width={15}
      fill={this.state.humidityValue}
      rotation={90}
      cropDegree={90}
      tintColor="#4682b4"
      delay={0}
      backgroundColor="#b0c4de"
      stroke={[2, 2]} //For a equaly dashed line
      strokeCap="circle" 
      value={this.state.humidityValue}
  />
  <Text style={{fontSize:25, top:-120}}>{this.state.humidityValue}</Text>
  
      <Slider
      style={{width: 300, height: 40}}
      maximumValue={1000}
      minimumValue={1}
      step={1}
      value={1000}
      value={this.state.sliderValue}
      onValueChange={(sliderValue) => this.changeValue(sliderValue)}
      thumbTintColor="#1f71b5"
      trackStyle={styles.trackStyle}     
      minimumTrackTintColor="#4682b4"
      maximumTrackTintColor="#b0c4de"  
      />
  <Text style={styles.valuetext}>{this.state.sliderValue / 10}</Text>
  <View style ={styles.container2}>
      <TouchableOpacity style={styles.button} onPress = {(value) => this.UploadValue()}>
        <Text style ={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.buttonRain}>
      <Text 
      style ={styles.buttonText}
      onPressIn = {this.watering("true")}
      onPressOut = {this.watering("false")}
      >
      Water</Text>
      </TouchableOpacity>
      </View>
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
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:"#4682b4",
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 10
  },
  buttonText:{
    color:"#fff",
    position:"absolute",
    textAlign:"center",
    fontSize:21,
    paddingTop:34
  },
  trackStyle:{
    color:"#000000"
  },
  valuetext:{
    fontSize:25
  },
  buttonRain:{
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:"#4682b4",
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 10
  },
  container2:{
    flexDirection: 'row',
  }
});
