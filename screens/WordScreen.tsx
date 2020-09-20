import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';


/*
 * Word Screen displays detailed word information and interaction.
 *
 * Accessed via dictionary.
 * 
 * @param {react.Props} props Properties passed to this screen.
 * @return Word screen render
 */
export default function WordScreen(props) {
  const params = props.route.params;
  console.log("Word Screen got word: " + params.word);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params.word}</Text>
      <Text style={styles.title}>Translation: {params.translation}</Text>
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
  }
});