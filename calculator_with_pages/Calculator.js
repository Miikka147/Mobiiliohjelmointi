import { NavigationHelpersContext } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList } from 'react-native';



export default function Calculator({ navigation }){
  
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState('');
    const [data, setData] = useState([]);
    
    
  
    const Sum = () => {
      setResult(parseInt(number1)+parseInt(number2));
      var r =(parseInt(number1)+parseInt(number2));
      setData([...data, number1 + "+" + number2+ "=" + r]);
      
      
      
    }
    const Subtract = () => {
      setResult(parseInt(number1)-parseInt(number2));
      var r =(parseInt(number1)-parseInt(number2));
      setData([...data, number1 + "-" + number2+ "=" + r]);
      
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
      <View style={styles.button}>
    <Button color="blue" title="HISTORY" onPress={() => navigation.navigate('History',{h:data})}/>
    </View>
    
  </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:50
    },
    button:{
      width:100,
      margin:2
    }
  });