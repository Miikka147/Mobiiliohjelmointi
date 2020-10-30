import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button,TextInput,Alert } from 'react-native';



  var eka =(Math.floor(Math.random() * 100 +1));
  
export default function App() {
  
  const [number1, setNumber1] = useState('');
  const [info, setInfo] = useState('Guess a number between 1-100');
  const [guesses, setGuesses] =useState(1);
  const [target, setTarget]= useState(eka);
  function guess() {
    setGuesses(guesses +1);
     if(number1 == target){
      Alert.alert("You guessed the number with " + guesses + " guesses!");
      setGuesses(1);
      setTarget(Math.floor(Math.random() * 100 +1));
      setInfo('To play again make a guess between 1-100')
    }
     if(number1 < target){
       setInfo('Your guess ('+number1+') is too low')
     }
     if(number1 > target){
       setInfo('Your guess ('+number1+') is too high')
     }

   }

  return (
    
    <View style={styles.container}>
          <Text>{info}</Text>
          
    <TextInput style={{borderWidth:1, margin:10,width:100}}
    placeholder="Guess"
    onChangeText={text => setNumber1(text)}
    value ={number1}
    keyboardType={'numeric'}/>

    <Button color="blue" title="MAKE A GUESS" onPress={guess}/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
