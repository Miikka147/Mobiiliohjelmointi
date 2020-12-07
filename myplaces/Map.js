import React, { useState,useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {  Alert, StyleSheet,  View} from 'react-native';

export default function Cmap({navigation,route}) {
  const address = route.params;
  const [lat, setLatitude] = useState(60.200692);
  const [lng, setLongitude] = useState(24.934302);


  useEffect(() => { findAddress() }, []);


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
          latitudeDelta: 100.0,
          longitudeDelta: 100.0,
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
       </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});