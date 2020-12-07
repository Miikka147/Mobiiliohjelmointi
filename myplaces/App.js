
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cmap from './Cmap';
import Myplaces from './Myplaces'
import Map from './Map'
import { Ionicons } from '@expo/vector-icons';




const Stack = createStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="My Places" component={Myplaces} />
      <Stack.Screen name="CMap" component={Cmap} />
      <Stack.Screen name="Map" component={Map} />
    </ Stack.Navigator>
    </ NavigationContainer>

  )
  
 
  
}