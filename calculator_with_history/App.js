import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList } from 'react-native';




  
export default function App() {
  
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);
  
  

  const Sum = () => {
    setResult(parseInt(number1)+parseInt(number2));
    var r =(parseInt(number1)+parseInt(number2));
    setData([...data, {history: number1 + "+" + number2+ "=" + r}]);
    
    
    
  }
  const Subtract = () => {
    setResult(parseInt(number1)-parseInt(number2));
    var r =(parseInt(number1)-parseInt(number2));
    setData([...data, {history: number1 + "-" + number2+ "=" + r}]);
    
  }

  return (
    
    <View style={styles.container}>
          <Text>Result:{result}</Text>
          
    <TextInput style={{borderWidth:1, margin:10,width:100}}
    placeholder="Number1"
    onChangeText={text => setNumber1(text)}
    value ={number1}
    keyboardType={'numeric'}></TextInput>

<TextInput style={{borderWidth:1, margin:10,width:100}}
    placeholder="Number2"
    onChangeText={text => setNumber2(text)}
    value ={number2}
    keyboardType={'numeric'}></TextInput>
    
    <View style={styles.button}>
    <Button color="green" title="SUM" onPress={Sum}></Button>
    </View>
    <View style={styles.button}>
    <Button color="red" title="SUBTRACT" onPress={Subtract}></Button>
    </View>
    <Text>History:</Text>
    <FlatList
    keyExtractor={() => Math.random().toString(36).substr(2, 9)}
      data={data}
      renderItem={({item}) =>
      <Text>{item.history}</Text>}
      
    />
    
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
  button:{
    width:100,
    margin:2
  }
});