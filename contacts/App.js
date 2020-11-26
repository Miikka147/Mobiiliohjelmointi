import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({ 
      });

      if (data.length > 0) {
        setContact(data);
      }
   }
  }
  return (
    <View style={styles.container}>
      <Text>
      </Text>
      <Button title="Get Contacts" onPress={getContacts}></Button>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={contact}
        renderItem={({item}) =>
      <View>
        <Text>{item.name},{item.phoneNumbers[0].number}
        </Text>
        </View>}
      
    />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:70
  },
});
