import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ChallengeComponent from '../components/ChallengeComponent';



export default function ChallengeScreen(props) {
  /*There is something with react that makes it unable to call function in useState to initalize
    so a default pic must be used or the first image url must be given and the inital state
    and the first value of the images array below
  */

  return (
    <View style={styles.container}>
      <ChallengeComponent {...props}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 0,
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