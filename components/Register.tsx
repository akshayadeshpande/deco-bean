import * as React from 'react';
import {Picker} from '@react-native-community/picker';
import { StyleSheet, Button, ScrollView, Platform, Image } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as SigninFunctions from './Signin';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';


export default function Register() {
    const colorScheme = useColorScheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [homeLang, setHomeLang] = useState('English');
    const [forLang, setForLang] = useState('');

    return (
      <ScrollView>
        <View style={styles.buttonWrapper}>
        <Text > Register for MeMa </Text>
        <View>
          <TextInput 
            placeholder="Name" 
            onChangeText={(t) => setName(t)}
            value={name}/>
          <TextInput 
            placeholder="Email" 
            onChangeText={(t) => setEmail(t)}
            value={email}/>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(t) => setPassword(t)}
            value={password}/>
          <View style={{padding:40}}>
          </View>

          <View style={styles.buttonWrapper}>
          <Text>Language to learn</Text>
          </View>
          


          <View style={styles.buttonWrapper}>
          { forLang === "Chinese" ?
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/images/Chinese.png')} style={styles.icon}/>
            
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {setForLang("Chinese")}}>
                <Text>Chinese</Text>
              </TouchableOpacity>
            
          </View>
          :
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/images/Chinese.png')} style={styles.icon}/>
            
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setForLang("Chinese")}}>
                <Text>Chinese</Text>
              </TouchableOpacity>
            
          </View>
          }
          </View>

          <View style={styles.buttonWrapper}>
          { forLang === "Spanish" ?
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/images/Spanish.png')} style={styles.icon}/>
            
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {setForLang("Spanish")}}>
                <Text>Spanish</Text>
              </TouchableOpacity>
            
          </View>
          :
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/images/Spanish.png')} style={styles.icon}/>
            
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setForLang("Spanish")}}>
                <Text>Spanish</Text>
              </TouchableOpacity>
            
          </View>
          }
          </View>

          </View>
          </View>
          
          {Platform.OS === "ios" ? 
          <View style={styles.Register}>
          <Button title="Register" 
          color={"#fff"}
          onPress={event => registerUser(event, name, email, password, forLang, homeLang)}
          />
          </View>
          :
          
          <Button title="Register" 
          color={Colors[colorScheme].activeTint}
          onPress={event => registerUser(event, name, email, password, forLang, homeLang)}
          />
          
          }
        
        
      </ScrollView>
    )
}

async function registerUser(event, name, email, password, forLang, homeLang){
  const auth = firebase.auth();
  const db = firebase.firestore();
  const usersCollection = "users";
  event.preventDefault();
  // console.log('form submitted');
  // console.log(name);
  // console.log(password);

  auth.createUserWithEmailAndPassword(email, password).then(function(data){
    var user = auth.currentUser;
    if (user != null){
      user.updateProfile({
        displayName: name
      }).then(function() {
          // console.log(user);
      });  
      const userData = {
        country: 'Australia', //TODO: integrate with a dropdown in the registration.
        email: user.email,
        forLang: forLang,
        homeLang: homeLang, 
        name: name,
        userName: name,
        signedUp: firebase.firestore.Timestamp.now(),
        friends: [],
        seen: {}
      }
      const rest = db.collection(usersCollection).doc(user.uid).set(userData);
    } else {
      alert("Internal error please try again later");
    }
    SigninFunctions.loginUser(event, email, password).then(() => {
      alert("Account created successfully, enjoy MeMa");
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode);
    alert(errorMessage);
    // TODO: send an alert if there is an error
  });
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
    Register: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 50,
      justifyContent: "center",
      alignItems: "center",
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
     icon: {
      width: 30, 
      height: 30,
    },
     appButtonContainer: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    appButtonContainer2: {
      elevation: 8,
      backgroundColor: "#FCEB97",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 25,
      justifyContent: "center",
      alignItems: "center",
    }
  });