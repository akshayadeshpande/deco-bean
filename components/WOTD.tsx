import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

/* Word of the Day Component. 
 * Allows us to plug this into a screen.
*/

/* RENDERING */
// This function needs to be upper case to be used as a component tag otherwise it thinks it's an html tag.
function WordOfTheday(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word of the Day</Text>
      <Text style={styles.text}>{props.word}</Text>
    </View>
  )
}

/* Functionality */
function getDailyWord() {
  // Method to get the word of the day here from dictionary/db
  const dummyWord:string = "Doggo";
  return dummyWord;
}

/* STYLES */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 20,
    }
  });

export { WordOfTheday as default, getDailyWord }