import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, Picker } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import * as SigninFunctions from './Signin';


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [homeLang, setHomeLang] = useState('English');
    const [forLang, setForLang] = useState('Spanish');

    return (
      <ScrollView>
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
          <Picker
            selectedValue={homeLang}
            onValueChange={homeLang => setHomeLang(homeLang)}>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="Chinese" value="Chinese" />
          </Picker>
          <Picker
            selectedValue={forLang}
            onValueChange={forLang => setForLang(forLang)}>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="Chinese" value="Chinese" />
          </Picker>
          <Button title="Register" onPress={event => registerUser(event, name, email, password, forLang, homeLang)} />
        </View>
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
        email: user.email,
        forLang: forLang,
        homeLang: homeLang, 
        name: name,
        userName: name,
        signedUp: firebase.firestore.Timestamp.now()
      }
      const rest = db.collection(usersCollection).doc(user.uid).set(userData);
    } else {
      // TODO: send an alert if there is an error 
    }
    SigninFunctions.loginUser(event, email, password).then(() => {
      alert("Account created successfully, enjoy MeMa");
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode);
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