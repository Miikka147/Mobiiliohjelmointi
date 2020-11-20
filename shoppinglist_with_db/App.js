import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('itemdb.db');

export default function App() {
  const [shopitem, setShopitem] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists items (id integer primary key not null, name text, amount text);');
    });
    updateList();
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into items (name, amount) values (?, ?);', [shopitem, amount]);
    }, null, updateList
    )
    setShopitem('');
    setAmount('');
  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from items;',[],(_, { rows }) =>
      setData(rows._array)
      );
    });
  }

  function deleteItem(id) {
    console.log(id);
    db.transaction(
      tx => {
        tx.executeSql('delete from items where id=?;',[id]);
      },null, updateList
    )
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
    keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={({item}) =>
      <View>
        <Text>{item.name},{item.amount}
        <AntDesign name="delete" size={36} color="black" onPress={() => deleteItem(item.id)} />
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
