import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* Word of the Day Component. 
 * Allows us to plug this into a screen.
*/

export default function WordDisplay(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word of the Day</Text>
      <Text style={styles.text}>{props.word}</Text>
    </View>
  )
}

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
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    text: {
      padding: 20,
      fontSize: 20,
    }
  });

