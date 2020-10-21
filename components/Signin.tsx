import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';



export default function Register({navigation}) {
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <ScrollView>
        
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput 
            placeholder="Enter email" 
            onChangeText={(t) => setEmail(t)}
            value={email}
            style={styles.textInput}/>
          <Text style={styles.text}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter password"
            onChangeText={(t) => setPassword(t)}
            value={password}
            style={styles.textInput}/>
          <View style={{padding:25}}/>
          
          <View style={styles.buttonWrapper}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {navigation.navigate('StartLearning')}}>
                  <Text>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          
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
      );
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
    height: 20, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10,
    },
    text: {
      padding: 5,
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