import React, {useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as SQlite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { Header, Input,Button, ListItem} from 'react-native-elements';
import { StyleSheet, Text, View,FlatList } from 'react-native';




const db = SQlite.openDatabase('itemdb.db');

export default function Myplaces({navigation}) {
  const [place, setPlace] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, name text);');
    });
    updateList();
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into places (name) values (?);', [place]);
    }, null, updateList
    )
    setPlace('');
  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places;',[],(_, { rows }) =>
      setData(rows._array)
      );
    });
  }

  function deleteItem(id) {
    console.log(id);
    db.transaction(
      tx => {
        tx.executeSql('delete from places where id=?;',[id]);
      },null, updateList
    )
  }
 
  return (
    
    <View style={styles.container}>

    <View style={styles.inputs}>
    <Input 
      label="Place finder"
      placeholder="Type in address"
      onChangeText={text => setPlace(text)}
      value={place}
    ></Input>
    </View>


    
    <View style={styles.button}>
    <Button color="green" title="Save" onPress={saveItem}></Button>
    </View>
    
    
    <FlatList
    keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={({item}) =>
      <ListItem bottomDivider>
     <View style={{width:'60%'}}>
       <ListItem.Content>
       <ListItem.Title onLongPress={() => deleteItem(item.id)}>{item.name}</ListItem.Title>
        </ListItem.Content>
        </View>
        <Button color="blue" title="Show on map" onPress={() => navigation.navigate('Map',item.name)}/>
        
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
