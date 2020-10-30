import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList } from 'react-native';




  
export default function App() {
  const [shopitem, setShopitem] = useState('');
  const [data, setData] = useState([]);

   const Add = () => {  
    setData([...data, {key:shopitem}]);
    setShopitem('');
  }
  const Clear = () => {
    setData([]);
   
  }

  return (
    
    <View style={styles.container}>
    <Text>Add items to your shopping list</Text>
    <TextInput style={{borderWidth:1, margin:10,width:100}}
    placeholder=""
    onChangeText={text => setShopitem(text)}
    value={shopitem}
    ></TextInput>


    
    <View style={styles.button}>
    <Button color="green" title="ADD" onPress={Add}></Button>
    </View>
    <View style={styles.button}>
    <Button color="red" title="CLEAR" onPress={Clear}></Button>
    </View>
    <Text>Shopping List:</Text>
    <FlatList
    keyExtractor={() => Math.random().toString(36).substr(2, 9)}
      data={data}
      renderItem={({item}) =>
      <Text>{item.key}</Text>}
      
    />
    
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
  button:{
    width:100,
    margin:2
  }
});