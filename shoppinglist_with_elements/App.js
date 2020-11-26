
import React, {useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as SQlite from 'expo-sqlite';
import { Header, Input,Button, ListItem} from 'react-native-elements';
import { StyleSheet, Text, View,FlatList } from 'react-native';




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
      <Header
        centerComponent={{text: 'SHOPPING LIST', style:{color:'#fff'}}}
      />
    <View style={styles.inputs}>
    <Input 
      label="Product"
      placeholder=""
      onChangeText={text => setShopitem(text)}
      value={shopitem}
    ></Input>
    <Input 
      label="Amount"
      placeholder=""
      onChangeText={text => setAmount(text)}
      value={amount}
    ></Input>
    </View>


    
    <View style={styles.button}>
    <Button color="green" title="ADD" onPress={saveItem}></Button>
    </View>
    
    <Text style={{fontSize:25}}>Shopping List:</Text>
    
    
    <FlatList
    keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={({item}) =>
      <ListItem bottomDivider>
     <View style={{width:'80%'}}>
       <ListItem.Content>
       <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        </ListItem.Content>
        </View>
        <AntDesign name="delete" size={36} color="black" onPress={() => deleteItem(item.id)} />
        </ListItem>
        }
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
 
  },
  button:{
    width:'80%',
    margin:2
  },
  inputs:{
    width:'80%',
    marginTop:30
  }
});
