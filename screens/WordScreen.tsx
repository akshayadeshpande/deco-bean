import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
      <View style={styles.containerWords}>
        <Text style={styles.title}>Word: {params.word}</Text>
        <Text style={styles.title}>Translation: {params.translation}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image source={{ uri: params.imgURL}} style={styles.imageStyle} />
      </View>
      <View style={styles.containerInteract}>
        <FontAwesome name="file-audio-o" size={24} color="black" />
        <FontAwesome name="bookmark" size={24} color="black" />
        <FontAwesome name="share-alt" size={24} color="black" />
      </View>
      <View style={styles.containerProgress}>
        <Text>*Icons are placeholders, so is the progress bar of course...</Text>
        <Text style={styles.title}>Progress: |----------|</Text>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  containerWords: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerProgress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerInteract: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
  imageStyle:{
    width: 300, 
    height: 300, 
    resizeMode: 'center'
  }
});