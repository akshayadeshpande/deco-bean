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
      <View style={{padding:10}}/>
      <Text style={styles.headerTitle}>Sign In</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    elevation: 8,
    backgroundColor: "#FF9E1C",
    paddingVertical: 5,
    paddingHorizontal: 75,
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  imgLogo: {
    height: 100,
    width: 200,
    resizeMode: 'stretch',
  },
});