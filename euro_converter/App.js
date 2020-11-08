import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [currency, setCurrency] = useState('');
  const [euros, setEuros] = useState('');
  const [rates, setRates] = useState([]);
  const [conversion, setConversion] = useState(0);

  const getRates = () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRates(responseJson.rates);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
    setConversion(parseFloat(euros)/parseFloat(currency))
  }
  
  

  return (
  
    <View style={styles.container}>

      
      <TextInput 
        value={euros} 
        placeholder="Value"
        onChangeText={(euros) => setEuros(euros)} 
      /><Picker
      selectedValue={currency}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    setCurrency(itemValue)
  }>
  <Picker.Item label="CAD" value={rates.CAD} />
  <Picker.Item label="HKD" value={rates.HKD} />
  <Picker.Item label="ISK" value={rates.ISK} />
  <Picker.Item label="PHP" value={rates.PHP} />
  <Picker.Item label="DKK" value={rates.DKK} />
  <Picker.Item label="HUF" value={rates.HUF} />
  <Picker.Item label="CZK" value={rates.CZK} />
  <Picker.Item label="AUD" value={rates.AUD} />
  <Picker.Item label="RON" value={rates.RON} />
  <Picker.Item label="SEK" value={rates.SEK} />
  <Picker.Item label="IDR" value={rates.IDR} />
  <Picker.Item label="INR" value={rates.INR} />
  <Picker.Item label="BRL" value={rates.BRL} />
  <Picker.Item label="RUB" value={rates.RUB} />
  <Picker.Item label="HRK" value={rates.HRK} />
  <Picker.Item label="JPY" value={rates.JPY} />
  <Picker.Item label="THB" value={rates.THB} />
  <Picker.Item label="CHF" value={rates.CHF} />
  <Picker.Item label="SGD" value={rates.SGD} />
  <Picker.Item label="PLN" value={rates.PLN} />
  <Picker.Item label="BGN" value={rates.BGN} />
  <Picker.Item label="TRY" value={rates.TRY} />
  <Picker.Item label="CNY" value={rates.CNY} />
  <Picker.Item label="NOK" value={rates.NOK} />
  <Picker.Item label="NZD" value={rates.NZD} />
  <Picker.Item label="ZAR" value={rates.ZAR} />
  <Picker.Item label="USD" value={rates.USD} />
  <Picker.Item label="MXN" value={rates.MXN} />
  <Picker.Item label="ILS" value={rates.ILS} />
  <Picker.Item label="GBP" value={rates.GBP} />
  <Picker.Item label="KRW" value={rates.KRW} />
  <Picker.Item label="MYR" value={rates.MYR} />


</Picker>
    
     <Button title="Convert" onPress={getRates} />
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
