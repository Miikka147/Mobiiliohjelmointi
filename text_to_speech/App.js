import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import * as Speech from 'expo-speech';
import { StyleSheet, View, Button, TextInput } from 'react-native';

export default function App() {

  const [textvar, setTextvar] = useState('');
  
  function speak(){
    Speech.speak(textvar);
    setTextvar('');   
  }
  
  
  return (
    <View style={styles.container}>
      <TextInput style={{borderWidth:1, margin:10,width:100}}
        placeholder="Text to speech"
        onChangeText={text => setTextvar(text)}
        value={textvar}
      ></TextInput>
      <Button color="green" title="Speak" onPress={speak}>

      </Button>
 
      <StatusBar style="auto" />
    </View>
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:70
  },
});
