import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Register from '../components/Register';
import * as firebase from 'firebase';

export default function RegisterScreen({navigation}) {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate("SignIn")
      navigation.navigate("MainApp")
    } 
  });
  
  return (
    <View style={styles.container}>
      <View style={{padding:10}}/>
      <Text style={styles.title}>Create Account</Text>
      <Register navigation={navigation}/>
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
  imgLogo: {
    height: 100,
    width: 200,
    resizeMode: 'stretch',
  },
  title: {
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
});