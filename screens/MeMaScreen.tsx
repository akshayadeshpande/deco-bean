import * as React from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

/**
 * Recording options used for the variety of devices. 
 */
const recordingOptions = {
  android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
  },
  ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
  },
};

/**
 * Functional component for loading the MeMascreen. Contains the the outline code which works 
 * against three commands currently "start challenge", "show me my friends", \
 * "hey Mema how do I say elephant in spanish". Other functional code is also included for
 * potential integration with Google Cloud's speech to text functionality. 
 */
export default function MeMaScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState('');
  let recordingStatus;
  let soundObject = new Audio.Sound();

  // Asks the permisions to use microphone
  useEffect(() => {
      Permissions.askAsync(Permissions.AUDIO_RECORDING);
  }, []);

  // Voice recording is stored as a file, and thus cleared after processing
  const deleteRecordingFile = async () => {
    try {
        const info = await FileSystem.getInfoAsync(recording.getURI());
        await FileSystem.deleteAsync(info.uri)
    } catch(error) {
        console.log("There was an error deleting recording file: ", error);
    }
  }

  // Code to start the recording. 
  const startRecording = async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') return;
    setIsRecording(true);

    await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
    });

    const recording = new Audio.Recording();
  
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log("There was an error when starting to recording: ", error);
      stopRecording();
    }
    // Sets the status of recording for UI changes. 
    setRecording(recording);
  }

  // Function for stopping recording and post processing it
  const stopRecording = async () => {
      setIsRecording(false);
      try {
          await recording.stopAndUnloadAsync();
          recordingStatus = await recording.getStatusAsync();
          let duration = recordingStatus.durationMillis;
          console.log("Detected voice command of length (ms) ", duration);
          // To simulate a mockup of the desired functionality, the app uses
          // the duration of the voice command to determine its post processing
          // against fixed command. The goal is to use the getTranscript app to connect with
          // Google's Speetch to Text API to get exact voice commands. 
          if (duration < 1200){
            navigation.navigate("Challenge", {screen:'ChallangeScreen', initial: false});
          } else if (duration >= 1200 && duration < 1800){
            navigation.navigate('Profile', {screen: "FriendsScreen", initial: false});
          } else {
            await soundObject.loadAsync({uri: "https://firebasestorage.googleapis.com/v0/b/bean-f1602.appspot.com/o/audio%2FSpanish%2FElephant.mp3?alt=media&token=2936bfa0-9964-4e89-a795-2981735d94b6"});
            await soundObject.setPositionAsync(0);
            await soundObject.playAsync();
          }
     } catch (error) {
          console.log("Error when trying to stop and unload the recording: ", error);
      }
  }

  const resetRecording = () => {
      deleteRecordingFile();
      setRecording(null);
  };

  const handleOnPressIn = () => {
      startRecording();
  };

  // Test function to integrate the voice with Google's speech to text functionality
  // Currently this method is implemented but not used. 
  const getTranscription = async () => {
    setIsFetching(true);
    try {
        const info = await FileSystem.getInfoAsync(recording.getURI());
        console.log(`FILE INFO: ${JSON.stringify(info)}`);
        const uri = info.uri;
        const formData = new FormData();
        formData.append('file', {
            uri,
            type: 'audio/x-wav',
            name: 'speech2text'
        });
        const response = await fetch("https://us-central1-bean-f1602.cloudfunctions.net/audioToText", {
            method: 'POST',
            body: formData
        });
        console.log(response);
        const data = await response.json();
        console.log("Data is " + data);
        setQuery(data.transcript);
        console.log(data.transcript);
    } catch(error) {
        console.log('There was an error reading file', error);
        stopRecording();
        resetRecording();
    }
    setIsFetching(false);
}

  const handleOnPressOut = () => {
      stopRecording();
      // getTranscription();
  };

  useEffect(() => {
    Permissions.askAsync(Permissions.AUDIO_RECORDING);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.imgGap}>
          <Image source={require('../assets/images/TalkMema.png')} style={styles.mema}/>
      </View>
      <View style={styles.container}>
          <TouchableOpacity onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
            {isFetching && <ActivityIndicator size="large" color={Colors[colorScheme].activeTint}/>}
            {!isFetching &&  <Image source={require('../assets/images/Mic.png')}/>}
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    width:150,
    height:150,
    resizeMode: "stretch",
  },
  mema: {
    width: 300,
    height: 300,
  },
  imgGap: {
    padding: 50,
    alignItems:"center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
  button: {
    backgroundColor: '#48C9B0',
    paddingVertical: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
}
});
