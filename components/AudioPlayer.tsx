import * as React from 'react';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';


/*
 * Audio/Sound player component.
 * 
 * @param {react.Props} props Properties passed to this screen.
 * @return Audio player render for user to interact with.
 */
export default function AudioPlayer(props) {
  const colorScheme = useColorScheme();
  const soundURI = props.soundURI;
  let soundObject = new Audio.Sound();

  /*
  * Function to play loaded audio.
  * First it will set position of audio to 0, as it remembers last position.
  * If we don't set position, it will only play once!
  */
  const playAudio = async () => {
      try {
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
        console.log("Sound played.");
      } 
      catch (error) {
        console.log(`${error.name}:${error.message}: Failed to play audio from URI: ${soundURI}`)
      }
  }

  /*
  * Call all necessary functions and settings for playing audio files.
  * More details on what we can change here:
  * https://docs.expo.io/versions/latest/sdk/av/
  * 
  * All defaults should suffice for us!
  */
  const loadAudio = async () => {
    try {
      await soundObject.loadAsync({uri: soundURI});
    }
    catch (error) {
      console.log(`${error.name}:${error.message}: Failed to load audio from URI: ${soundURI}`);
    }
    
  }

  /*
   * React hook to run on component mount.
   */
  useEffect(() => {
    // Load Audio
    loadAudio();
    return function cleanup() {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    }
  })

  //Renders component
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => playAudio()}
    >
      <FontAwesome name="play-circle" size={100} color={Colors[colorScheme].activeTint} />
      <Text style={styles.text}>Play Audio</Text>
    </TouchableOpacity>
  );
}

//Component styling
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
