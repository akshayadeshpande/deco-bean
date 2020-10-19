import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colours from '../constants/Colors';
import Layout from '../constants/Layout';
import { Text, View } from '../components/Themed';
import AudioPlayer from '../components/AudioPlayer';


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
  // Filled Star.
  const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star.
  const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  console.log("Word Screen got word: " + params.word);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerWords}>
        <Text style={styles.title}>{params.word}</Text>
        <Text style={styles.title}>Translation: {params.translation}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.containerImage}>
        <Image source={{ uri: params.imgURL}} style={styles.imageStyle} />
      </View>
      <View style={styles.containerAudio}>
        <AudioPlayer soundURI={params.soundURI}/>
      </View>
      <View style={styles.separator} />
      <View style={styles.containerWords}>
        <Text style={styles.title}>Skill Level</Text>
        <View style={styles.containerProgress}>
          <Image
            style={styles.starImageStyle}
            source={{uri: starImageFilled }}
          />
          <Image
            style={styles.starImageStyle}
            source={{uri: starImageCorner }}
          />
          <Image
            style={styles.starImageStyle}
            source={{uri: starImageCorner }}
          />
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.light.background
  },
  containerWords: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerAudio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerProgress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerInteract: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
  },
  separator: {
    marginVertical: 1,
    height: 2,
    width: '90%',
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.90,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: 'rgba(255, 158, 28, 0.8)',
    alignSelf: 'center',
  },
  text: {
    margin: 10,
  },
  imageStyle:{
    width: Layout.window.width / 2,
    aspectRatio: 1
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  flexBreak: {
    flexBasis: "100%",
    height: 0,
  }
});