import * as React from 'react';
import { Button, StyleSheet, Platform } from 'react-native';
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
      <Text style={styles.title}>Sign Into MeMa</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Signin/>
      <Text>New user?</Text>
      {Platform.OS === "ios" ? 
      <View style={styles.appButtonContainer}>
      <Button title="Sign-Up Here!" 
      color={"#fff"}
      onPress={() => navigation.navigate("SignUp")}
      />
      </View>
      : 
      <Button title="Sign-Up Here!" 
      color={Colors[colorScheme].activeTint}
      onPress={() => navigation.navigate("SignUp")}
      />
      }
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
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
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FF9E1C",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});