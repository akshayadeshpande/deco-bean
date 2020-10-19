import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import 'firebase/functions';

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
  // Score is out of 3, where 1 == 1, 5 == 2, 10 == 3
  const [score, setScore] = useState(0);

  useEffect(() => {
    getScore(params.word, setScore);
  }, []);

  console.log("Word Screen got word: " + params.word);
  console.log(`Your score is: ${score} stars`);
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
          <StarRating
            disabled={false}
            fullStarColor="gold"
            maxStars={3}
            starSize={60}
            rating={score}
            selectedStar={(rating) => alert(`Hit star rating ${rating}`)}
          />
        </View>
      </View>

    </ScrollView>
  );
}

const getScore = async (word, scoreUpdater) => {
  // Get all user game sessions
  let mcqSessions = firebase.functions().httpsCallable('getChallenges')
  await mcqSessions({word: word}).then((res) => {
    console.log(res.data.challenges);
  }).catch(err => {
    console.log("Error getting challenges!");
    console.log(err);
  });

  // Get word correctness across sessions

  // Get word incorrectness across sessions

  // Compute score
  let dummyScore = Math.floor(Math.random() * 3) + 1  

  // Update state with score
  scoreUpdater(dummyScore);
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