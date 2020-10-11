import * as React from 'react';
import { StyleSheet, Button, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

var count = 0;

export default function Profile(props) {

  //Runs on the first launch to get all the needed information for the game
    useEffect(() => {
        var getUser = firebase.functions().httpsCallable('getUser')
        getUser({}).then(function(result){
          console.log(result);
        }).catch(function(err){
          console.log(err);
          alert('An internal error occured. Please try again later.')
        })
    });

    return (
      <View style={styles.CMContainer}>   
      <Button title="Begin CH challenge" onPress={ () =>
          console.log("CH")
         }/>
      <Button title="Begin SP challenge" onPress={ () =>
        console.log("SP")
      } />
      <Button title='Tutorial' onPress={() =>
        console.log("Tute")
      }/>
      </View>
    )
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