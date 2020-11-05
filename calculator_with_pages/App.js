
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import History from './History';
import Calculator from './Calculator'
import { Ionicons } from '@expo/vector-icons';




const Stack = createStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="History" component={History} />
  
  
    
    </ Stack.Navigator>
    </ NavigationContainer>

  )
  
 
  
}

