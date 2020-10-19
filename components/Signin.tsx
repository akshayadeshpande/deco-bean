import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, Picker } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';



export default function Register() {
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <ScrollView>
        <Text > MeMa Login </Text>
        <View>
          <TextInput 
            placeholder="Email" 
            onChangeText={(t) => setEmail(t.trim())}
            value={email}/>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(t) => setPassword(t.trim())}
            value={password}/>

          {Platform.OS === "ios" ? 
          <View style={styles.appButtonContainer}>
          <Button title="Login" 
          color={"#fff"}
          onPress={event => loginUser(event, email, password)}
          />
          </View>
          : 
          <Button title="Login" 
          color={Colors[colorScheme].activeTint}
          onPress={event => loginUser(event, email, password)}
          />
          }

        </View>
      </ScrollView>
    )
}

export async function loginUser(event, email, password){
  const auth = firebase.auth();
  event.preventDefault();
  auth.signInWithEmailAndPassword(email, password).then((output) => {
    console.log(output)
  }).catch((err) => {
    var issue = err['code']
    console.log(issue);
    alert("Email/Password is wrong")
  })
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
     },
     appButtonContainer: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 5
    }
  });