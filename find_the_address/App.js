import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {  Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [address, setAddress] = useState('');
  const [lat, setLatitude] = useState(60.200692);
  const [lng, setLongitude] = useState(24.934302);


  const findAddress = async () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=6blSbuRVtAv5BCYiPyO1XcRDAL3AfDA5&maxResults=1&location='+address;
    
    try {
      const response = await fetch(url);
      const mq = await response.json();
      
      setLatitude(parseFloat(mq.results[0].locations[0].latLng.lat));
      setLongitude(parseFloat(mq.results[0].locations[0].latLng.lng));
     
    } catch(e){
      Alert.alert(url)
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1,}}
        initialRegion={{
          latitude:lat,
          longitude:lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
    
       
        
        ><Marker
        coordinate={{
          latitude: lat,
          longitude: lng,
        }}
        title={address}/>
        </MapView> 
        <TextInput 
           style={{textAlign:'center', borderWidth:1, width:'100%'}} 
           value={address} 
           placeholder="SEARCH"
           onChangeText={(address) => setAddress(address)} 
         />
        <Button title="Find" onPress={findAddress} />
       </View>
        
      

   
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
