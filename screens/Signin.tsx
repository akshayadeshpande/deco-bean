import * as React from 'react';
import {  StyleSheet, Image } from 'react-native';
import { View } from '../components/Themed';
import Signin from '../components/Signin';
import * as firebase from 'firebase';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/**
 * Default render function that will display this screen in the app
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */
export default function SigninScreen({navigation}) {
  const colorScheme = useColorScheme(); //Allowing set app colors

  //Firebase auth api allowing the user to get to the app on successful login
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate('MainApp')
    }
  });
  //Renders the screen components
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

//Screen styling
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