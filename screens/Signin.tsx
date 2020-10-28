import * as React from 'react';
import { Button, StyleSheet, Platform, Image } from 'react-native';
import { useState, useEffect, Component } from 'react';

import { Text, View } from '../components/Themed';
import Signin from '../components/Signin';
import Navigation from '../navigation'
import * as firebase from 'firebase';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { MemaText } from '../components/StyledText';

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
      <View style={styles.containerGreeting}>
        <Image source={require("../assets/images/welcomeMEMA.png")} style={styles.imgLogo}/> 
      </View>
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
  containerGreeting: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  imgLogo: {
    width: 250,
    resizeMode: 'contain',
  },
});