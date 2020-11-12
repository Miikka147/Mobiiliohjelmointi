import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {  Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function App() {
  const [address, setAddress] = useState('');
  const [lat, setLatitude] = useState(0.0);
  const [lng, setLongitude] = useState(0.0);

  useEffect(() => {
    getLocation();
  },[]);
  
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted'){
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(parseFloat(location.coords.latitude));
      setLongitude(parseFloat(location.coords.longitude));
    }
  };




  const findAddress = async () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=6blSbuRVtAv5BCYiPyO1XcRDAL3AfDA5&maxResults=1&location=' + address;

    try {
      const response = await fetch(url);
      const mq = await response.json();

      setLatitude(parseFloat(mq.results[0].locations[0].latLng.lat));
      setLongitude(parseFloat(mq.results[0].locations[0].latLng.lng));

    } catch (e) {
      Alert.alert(url);
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1,}}
        initialRegion={{
          latitude:lat,
          longitude:lng,
          latitudeDelta: 50.3322,
          longitudeDelta: 50.3221,
        }}
        region={{
          latitude:lat,
          longitude:lng,
          latitudeDelta: 0.3333,
          longitudeDelta: 0.3333,
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
