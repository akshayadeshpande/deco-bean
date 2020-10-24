import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import 'firebase/functions';

import Colours from '../constants/Colors';
import Layout from '../constants/Layout';
import { Text, View } from '../components/Themed';
import AudioPlayer from '../components/AudioPlayer';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


/*
 * Word Screen displays detailed word information and interaction.
 *
 * Accessed via dictionary.
 * 
 * Shows:
 * - Word and translation
 * - Image and audio player
 * - Progression and statistics
 * 
 * @param {react.Props} props Properties passed to this screen.
 * @return Word screen render
 */
export default function WordScreen(props) {
  const params = props.route.params;
  // Score is out of 3, where 1 == 1, 5 == 2, 10 == 3
  const [stars, setStars] = useState(0);
  const [stats, setStats] = useState({score: 0, correct: 0, incorrect: 0});
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    getScore(params.word, setStars, setStats);
  }, []);

  console.log("Word Screen got word: " + params.word);
  console.log(`Your score is: ${stars} stars`);
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
            selectedStar={() => setStatsVisible(!statsVisible)}
          />
        </View>
        <View>
          <Text style={styles.text}>Touch Stars to show stats</Text>
          {showStats(params.word, stats, statsVisible)}
        </View>
      </View>

    </ScrollView>
  );
}

/*
 * Shows word statistics if visible.
 *
 * @param {string} word The word displayed on this screen.
 * @param {Object} stats  State object that stores statistics data.
 * @param {boolean} visible Indicates if statistics are set to visible (true).
 * @returns Returns view with statistics text or null if not visible.
 */
const showStats = (word, stats, visible) => {
  if (visible) {
    return (
      <View>
        <Text style={styles.text}>Seen: {stats.correct + stats.incorrect}</Text>
        <Text style={styles.text}>Correct: {stats.correct}</Text>
        <Text style={styles.text}>Incorrect: {stats.incorrect}</Text>
        <Text style={styles.text}>Score: {stats.score}</Text>
      </View>
    )
  } else {
    return null;
  }

}
/*
 * Function gets the overall score and statistics for the word displayed on WordScreen.
 * From the base score it will calculate a star score for visual representation.
 * 
 * Final scores and statistics update react state.
 * 
 * NOTE: For MVP this is adequate, but to scale in future we should look towards what
 *        statistics we want to store and track these as the user uses the app rather than
 *        compute on the fly.
 * 
 * @param {string} word The word that this screen is displaying data for.
 * @param {function} setStars Setter for stars state.
 * @param {function} setStats Setter for statistics for this word.
 */
const getScore = async (word, setStars, setStats) => {
  const userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore()

  // Retrieve user's mcq sessions
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

  // Sessions that include this screen's word only
  const scoredSessions = mcqSessions.filter(doc => doc.score && (doc.correct.includes(word) || doc.incorrect.includes(word)));
  
  // Get correct/incorrect counts
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

  // Compute score for this screen's word
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
  let rawScore = score.correct - score.incorrect;

  // Compute Star Score for graphical display on screen
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

  // Update state with score
  setStars(starScore);
  setStats({score: rawScore, correct: score.correct, incorrect: score.incorrect})
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
    margin: 5,
    fontSize: 20,
  },
  imageStyle:{
    width: Layout.window.width / 2,
    aspectRatio: 1
  },
  flexBreak: {
    flexBasis: "100%",
    height: 0,
  }
});