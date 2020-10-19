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
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  useEffect(() => {
    getScore(params.word, setStars, setScore, setCorrect, setIncorrect);
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
            rating={stars}
            selectedStar={() => alert(`Times Correct: ${correct}\nTimes Incorrect: ${incorrect}\nRaw Score: ${score}`)}
          />
        </View>
      </View>

    </ScrollView>
  );
}

const getScore = async (word, setStars, setScore, setCorrect, setIncorrect) => {
  // Get all user game sessions
  // let mcqSessions = firebase.functions().httpsCallable('getChallenges')
  // await mcqSessions({}).then((res) => {
  //   console.log("Retrieve MCQ Sessions")
  //   console.log(res.data.challenges);
  // }).catch(err => {
  //   console.log("Error getting challenges!");
  //   console.log(err);
  // });

  const userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore()
  const mcqRefs = db.collection(`users/${userID}/mcq`);
  let mcqSessions = [];
  await mcqRefs.get().then(data => {
    data.forEach(doc => {
        mcqSessions.push(doc.data());
    })
  }).catch(error => {
    console.log("Unable to retrieve user mcq sessions, WordScreen.");
    console.log(error);
  });
  const scoredSessions = mcqSessions.filter(doc => doc.score && (doc.correct.includes(word) || doc.incorrect.includes(word)));
  // Get word correctness and incorrectness across sessions
  let correctWords = {};
  let incorrectWords = {};
  scoredSessions.forEach((session, idx) => {
    correctWords[idx] = session.correct.reduce((acc, word) => {
      acc[word] = acc[word] + 1 || 1
      return acc
    }, {})
    incorrectWords[idx] = session.incorrect.reduce((acc, word) => {
      acc[word] = acc[word] + 1 || 1
      return acc
    }, {})
  })
  console.log("Correct words:")
  console.log(correctWords);
  console.log("Incorrect words:")
  console.log(incorrectWords);

  // Compute score
  let score = { correct: 0, incorrect: 0 }
  Object.keys(correctWords).forEach(key => {
    if (correctWords[key][word]) {
      score.correct += correctWords[key][word];
    }
  });
  Object.keys(incorrectWords).forEach(key => {
    if (incorrectWords[key][word]) {
      score.incorrect += incorrectWords[key][word];
    }
  })
  console.log(score);
  let rawScore = score.correct - score.incorrect;
  console.log(`Raw Score: ${rawScore}`);
  // Compute Star Score
  // 1 == 1 star, < 5 == 1.5 stars, 5 == 2 stars, < 10 == 2.5 stars, 10+ == 3 stars
  let starScore = 0;
  if (rawScore < 1) {
    starScore = 0;
  } else if (rawScore === 1) {
    starScore = 1;
  } else if (rawScore < 5) {
    starScore = 1.5;
  } else if (rawScore === 5) {
    starScore = 2;
  } else if (rawScore < 10) {
    starScore = 2.5;
  } else if (rawScore >= 10) {
    starScore = 3;
  }
  console.log(`Stars: ${starScore}`);
  // Update state with score
  setStars(starScore);
  setScore(rawScore);
  setCorrect(score.correct);
  setIncorrect(score.incorrect);
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