import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect, Component } from 'react';

import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';



export default function Signin({navigation}) {
    const colorScheme = useColorScheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoading] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('MainApp')
      }
    });

    if (loaded) {
      return(
        <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
        </View>
      )
    } else {
  
      return (
        <View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput 
              placeholder="Enter email" 
              onChangeText={(t) => setEmail(t.trim())}
              value={email}
              style={styles.textInput}/>
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={(t) => setPassword(t.trim())}
              value={password}
              style={styles.textInput}/>
          <View style={{padding:25}}/>
            
          { // Login Buttons
          Platform.OS === "ios" ? 
          <View style={styles.appButtonContainer}>
          <Button 
            title="Login" 
            color={"#fff"}
            onPress={event => loginUser(event, email, password)}
          />
          </View>
          : 
          <Button 
            title="Login" 
            color={Colors[colorScheme].activeTint}
            onPress={event => {
              setLoading(true);loginUser(event, email, password); setLoading(false);}}
            />
          }
          </View>
        </View>
        );
    }
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
    textInput: {
      height: 50, 
      width: 200,
      borderColor: 'gray', 
      borderWidth: 1,
      backgroundColor: "#fff",
      padding: 10,
      color: "#FF9E1C",
      fontSize: 20,
    },
    text: {
      padding: 5,
      fontSize: 30,
    },
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
      paddingHorizontal: 30
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: "stretch"
    },
    buttonWrapper: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     padding: 10,
    },
  });