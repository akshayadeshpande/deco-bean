import * as React from 'react';
import { Button, StyleSheet, Platform, Image } from 'react-native';
import { useState, useEffect, Component } from 'react';

import { Text, View } from '../components/Themed';
import Signin from '../components/Signin';
import Navigation from '../navigation'
import * as firebase from 'firebase';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

var started = false;
export default function SigninScreen({navigation}) {
  const colorScheme = useColorScheme();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate('MainApp')
    }
  });
  
  return (
    <View style={styles.container}>
      <View style={{padding:100}}/>
      <Signin navigation={navigation}/>
      <Image source={require('../assets/images/MEMALOGO.png')} style={styles.imgLogo}/>
    </View>

  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FF9E1C",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  headerBar: {
    backgroundColor: "#FF9E1C",
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgLogo: {
    height: 100,
    width: 200,
    resizeMode: 'stretch',
  },
});