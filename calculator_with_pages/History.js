import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button,TextInput,FlatList } from 'react-native';


export default function History ({ route, navigation }){
const {h} = route.params;


    

    return(
     
        <View style={styles.container}>
             <Text>History:</Text>


        <FlatList
      keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        data={h}
        renderItem={({item}) =>
        <Text>{item}</Text>} />
        
      <View style={styles.button}>
   
    </View>
      
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:50,
      paddingTop:200
    },
    button:{
      width:100,
      margin:2
    }
  });