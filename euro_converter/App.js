import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [currency, setCurrency] = useState('');
  const [euros, setEuros] = useState('');
  const [rates, setRates] = useState([]);
  const [conversion, setConversion] = useState('');

  const getRates = async () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    
    try {
      const response = await fetch(url);
      const currencyData = await response.json();
      setRates(currencyData.rates);
    } catch(e){
      Alert.alert('Error!')
    }
  }
   
  useEffect(() => { getRates() }, []);

  const convert = () => {
    setConversion((parseFloat(euros)/parseFloat(rates[currency])).toFixed(2))
  }
  

  return (
    <View style={styles.container}>

      
    <TextInput 
      value={euros} 
      placeholder="Value"
      keyboardType={'numeric'}
      onChangeText={(euros) => setEuros(euros)} 
    /><Picker
    selectedValue={currency}
style={{height: 50, width: 100}}
onValueChange={(itemValue, itemIndex) => {
  console.log(itemValue, itemIndex);
  setCurrency(itemValue);
}}
>
  {Object.keys(rates).map(key =>(<Picker.Item label={key} value={key} key={key} />))}
  </Picker>
   <Button title="Convert" onPress={convert} />
   <Text>{conversion} €</Text>
   
  </View>
);
  
}

const styles = StyleSheet.create({
 container: {
   display:'flex',
  flex: 1,
  paddingTop:150,
  paddingLeft:50,
  paddingRight:50,
  backgroundColor: '#fff',
 },
 row:{
   flex:1,
   flexDirection:'row'
 }
 

})
