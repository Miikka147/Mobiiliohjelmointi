import { StatusBar } from 'expo-status-bar';
import React, {useState,Component} from 'react';
import {StyleSheet,View, Button, TextInput, Text, Alert} from 'react-native';

export default class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state={Number1:0,Number2:0};
  }

  Sum = () => {
    var Num1 = parseInt(this.state.Number1);
    var Num2 = parseInt(this.state.Number2);

    var result = Num1 + Num2;

    Alert.alert('Your result is: ' + result);

  }

  Subtract = () => {
    var Num1 = parseInt(this.state.Number1);
    var Num2 = parseInt(this.state.Number2);

    var result = Num1 - Num2;

    Alert.alert('Your result is: ' + result);

  }
 
  

  render()
  {
    return(
      <View style={styles.container}>
          
          <TextInput style={{borderWidth:1, margin:10}} placeholder="Number1" onChangeText={Number1 => this.setState({Number1})} keyboardType={'numeric'}/>

          <TextInput style={{borderWidth:1, margin:10}} placeholder="Number2" onChangeText={Number2 => this.setState({Number2})} keyboardType={'numeric'}/>

          <Button color="green"title="Sum" onPress={this.Sum}/>
          <Button color="red" title="Subtract" onPress={this.Subtract}/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    
    justifyContent: 'center',
  },
});

