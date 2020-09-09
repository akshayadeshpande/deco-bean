import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';


export default function Register() {

  //Runs on the first launch to get all the needed information for the game
    //TODO: Need a new default pic to begin OR somehow have a better original state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div>
        <form onSubmit={e => registerUser(e, name, email, password)}>
        <input name='name' type='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required />
        <input name='email' type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input name='password' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
       
        <button type='submit'>Register</button>
        </form>
      </div>
    )
}

async function registerUser(event, name, email, password){
  const auth = firebase.auth();
  const db = firebase.firestore();
  event.preventDefault();
  console.log('form submitted');
  console.log(name);
  console.log(password);

  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      console.log(user.uid);
    } else {
      // User not logged in or has just logged out.
    }
  });
}



/*
Makes a dictionary out of all the words in the DB.

@param: dbh - Reference the the firestor DB.
*/
async function makeWordURLDict(dbh : firebase.firestore.Firestore) {

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