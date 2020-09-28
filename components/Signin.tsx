import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, Picker } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';


export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <ScrollView>
        <Text > MeMa Login </Text>
        <View>
         
          <TextInput 
            placeholder="Email" 
            onChangeText={(t) => setEmail(t)}
            value={email}/>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(t) => setPassword(t)}
            value={password}/>
          <Button title="Login" onPress={event => loginUser(event, email, password)} />
        </View>
      </ScrollView>
    )
}

async function loginUser(event, email, password){
  const auth = firebase.auth();
  const db = firebase.firestore();
  const usersCollection = "users";
  event.preventDefault();
  auth.signInWithEmailAndPassword(email, password);    
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    CMContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    text: {
      padding: 20,
    },
    imageStyle:{
      width: 200, 
      height: 300, 
      resizeMode: 'center'
     }
  });