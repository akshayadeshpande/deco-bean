import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ChallengeComponent from '../components/ChallengeComponent';


/**
 * Renders the components for the challenge mode screen
 * 
 * Allows for the game to be played by rendering the main component of the screen <ChallengeComponent>
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
export default function ChallengeScreen(props) {

  //Renders what is needed to be on the screen
  return (
    <View style={styles.container}>
      <ChallengeComponent {...props}/>
    </View>
  );
}


//style for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});