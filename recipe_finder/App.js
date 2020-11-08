import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ search;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipes(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.href} 
        renderItem={({item}) =>
          <View>
            <Text style={{fontWeight:"bold"}}>{item.title}</Text>
            <Image style={styles.logo}source={{uri:item.thumbnail}}/>
            <Text style={{fontWeight:"bold"}}>Ingredients:</Text>
            <Text>{item.ingredients}</Text>
        </View>}
        
        ItemSeparatorComponent={listSeparator}
        data={recipes} 
      />
      
      <TextInput 
        style={{textAlign:'center'}} 
        value={search} 
        placeholder="SEARCH"
        onChangeText={(search) => setSearch(search)} 
      />
     <Button title="Find" onPress={getRecipes} />
     
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding:50,
  backgroundColor: '#fff',

 },
 logo: {
  width:50,
  height: 50,
  borderRadius:30,
 }
});