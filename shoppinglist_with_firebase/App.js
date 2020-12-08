import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBOrBEcUVWQZEo5zhudJdl3PqmU0U8-B4Q",
  authDomain: "tasks-b997e.firebaseapp.com",
  databaseURL: "https://tasks-b997e-default-rtdb.firebaseio.com/",
  projectId: "tasks-b997e",
  storageBucket: "tasks-b997e.appspot.com",
  messagingSenderId: "1041755818022",
  
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [shopitem, setShopitem] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase.database().ref('data/').on('value', snapshot =>  {
      console.log(snapshot.docs);
      const data = snapshot.val();
       
      const prods = Object.values(data);
      setItems(prods);
      console.log(prods);
      
    });
  }, []);

  const saveItem = () => {
    firebase.database().ref('data/').push(
      {
        'shopitem': shopitem,
         'amount': amount
        }
        );
    setShopitem('');
    setAmount('');
  }
  

  return (
    
    <View style={styles.container}>
    <Text style={{fontSize:15}}>Add items to your shopping list</Text>
    <TextInput style={{borderWidth:1, margin:10,width:100}}
      placeholder="Item"
      onChangeText={text => setShopitem(text)}
      value={shopitem}
    ></TextInput>
    <TextInput style={{borderWidth:1, margin:10,width:100}}
      placeholder="Amount"
      onChangeText={text => setAmount(text)}
      value={amount}
    ></TextInput>


    
    <View style={styles.button}>
    <Button color="green" title="ADD" onPress={saveItem}></Button>
    </View>
    
    <Text style={{fontSize:25}}>Shopping List:</Text>
    <FlatList
      keyExtractor={() => Math.random().toString(36).substr(2, 9)}
      data={items}
      renderItem={({item}) =>
      <View>
        <Text>{item.shopitem},{item.amount}
       
        </Text>
        </View>}
      
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
