import * as React from 'react';
import { StyleSheet, Button, Image, Platform, ProgressBarAndroid, ActivityIndicator} from 'react-native';
import { useState, useEffect, Component } from 'react';
import Toast from 'react-native-simple-toast';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MemaBText } from '../components/StyledText';

var count = 0;


var dbh : firebase.firestore.Firestore;

var wordInfo : {[key:string] : string[] } = {};

var currentWord : string;

var currentButtons : string[];

var keys : string[] = [];

var challengeLanguage = "";

var correctAnswers : String[] = [];
var incorrectAnswers : String[] = [];

const gameLength = 20

var id : String;



export default function ChallengeComponent(props) {
  const colorScheme = useColorScheme();
  const [loaded, setLoading] = useState(true);
  const [img, newImg] = useState('https://firebasestorage.googleapis.com/v0/b/bean-f1602.appspot.com/o/Images%2FApple.jpg?alt=media&token=9405ab95-7b0a-496a-9aa3-e20bff7d7bc4&fbclid=IwAR3Nv9bvimEEo4_nyN_IZpNO05bcMtC0Mhim50DEmqsg5JWkkJy7eYHCFX0');
  const [start, startingGame] = useState(false)
  const [answ, setCount] = useState(0)
  const [tutorial, setTut] = useState(false)

  //Runs on the first launch to get all the needed information for the game
    useEffect(() => {
        dbh = firebase.firestore();
        var incomingWords = firebase.functions().httpsCallable('startChallenge')
          incomingWords({count: gameLength}).then(function(result){
          makeWordURLDict(result.data['words']);
          challengeLanguage = result.data["lang"];
          id = result.data["id"]
          setLoading(false);
        }).catch(function(err){
          console.log(err);
          alert('An internal error occured. Please try again later.')
        })
         
    },[]);
    
    if (loaded) {
      return(
        <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
        </View>
      );
    } else {
      // Original Language Pick
    if (start == false && tutorial == false) {
      return (

        <View style={styles.CMContainer}> 
        
        <View style={styles.SmallSeperator}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => setTut(true)}>
          <MemaBText>Tutorial</MemaBText>
        </TouchableOpacity>
        </View>

        <View style={styles.SmallSeperator}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => {IntroStateChange(newImg, startingGame)}}>
          <MemaBText>Start Game</MemaBText>
        </TouchableOpacity>
        </View>

        </View>

      );
    } else if (tutorial == true) {

      return (
        <View style={styles.CMContainer}>
          
          <View style={styles.imgHolder}>
            <Image 
              source = {{ uri: img}}
              style = {styles.imageStyle} />
            <TouchableOpacity style={styles.imgWord}>
              <Text style={{ justifyContent:"center", alignItems:"center", padding:5}}>Apple</Text>
            </TouchableOpacity>
          </View>
          
          <View>
            <TouchableOpacity style={styles.appButtonContainer2} onPress={() => setTut(false)}>
              <Text style={styles.text}>Go Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.SmallSeperator}>
            <Text style={styles.tutorialText}>
              (Scroll to read text, Press the 'Go Back' button to be taken back to the game menu)
            </Text>
            <Text style={styles.tutorialText}>
              Challenge mode displays an image at the top of the screen, 
              depicting a word from the language you hae chosen. 
            </Text>
            <Text style={styles.tutorialText}>
              You will 4 clickable buttons with words on them from the language you
              are learning. 
            </Text>
            <Text style={styles.tutorialText}>
              Your task will be to select the correct word that represents the picture,
              then your score will be recorded on your profile so it can be viewed later. 
            </Text>
          </ScrollView>
          
        </View>
      );
    } else {
      // Final view for how many correct answes
      if (answ == gameLength) {
        var endGameCall = firebase.functions().httpsCallable('endChallenge')
        endGameCall({correct: correctAnswers, incorrect: incorrectAnswers, id: id, 
          score: correctAnswers.length+ "/" + gameLength})
        return (
          <View style={styles.CMContainer}>
          <Text style={styles.SmallSeperator}>You got {correctAnswers.length}/{gameLength}</Text>

          <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => {playAgain(setCount, startingGame)}}>
                <Text style={{padding:5}}>Play Again?</Text>
              </TouchableOpacity>
            </View>
          
            <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setCount(0);startingGame(false);}}>
                <Text style={{padding:5}}>Back to challenge screen</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        //View while playing giving the images and the button choices
        return (
          <View style={styles.CMContainer}>
            
            
            <View style={styles.imgHolder}>
              <Image 
                source = {{ uri: img}}
                style = {styles.imageStyle} 
              />
              <TouchableOpacity style={styles.imgWord}>
                <Text style={{ justifyContent:"center", alignItems:"center", padding:5}}>{currentWord}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {finalStateChange(answ, setCount, newImg, currentButtons[0])}}>
                <Text style={styles.text}>{currentButtons[0]}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {finalStateChange(answ, setCount, newImg, currentButtons[1])}}>
                <Text style={styles.text}>{currentButtons[1]}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {finalStateChange(answ, setCount, newImg, currentButtons[2])}}>
                <Text style={styles.text}>{currentButtons[2]}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.SmallSeperator}>
              <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {finalStateChange(answ, setCount, newImg, currentButtons[3])}}>
                <Text style={styles.text}>{currentButtons[3]}</Text>
              </TouchableOpacity>
            </View>

          </View> 
        );
      }
    }
}

    }
    

/*
Restarts the the game allowing the user to try again.

@setCount: Function to change the state of the screen.
@startingGame: State function that will set it the game is at the start or not.
*/
function playAgain(
  setCount: React.Dispatch<React.SetStateAction<number>>,
  startingGame: React.Dispatch<React.SetStateAction<boolean>>
) {
  correctAnswers = [];
  incorrectAnswers = [];
  setCount(0)
  startingGame(true)
}

/*
Used to play through the game causing state changes and therefor the scree to
rerender with new images for the game.

@answ: How many turns has the user had.
@setCount: Changes the state so the amount of turns played is updated.
@newImg: Function that will change the image that is being rendered.
@potentialWord: The users guess for the current round of the game.
*/
function finalStateChange(
  answ: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  newImg: React.Dispatch<React.SetStateAction<string>>,
  potentialWord : string) {
    checkWord(potentialWord);
    newImg(changeImg());
    setCount(answ + 1);
}

/*
Wrapper function allowing 2 state changes to occure on one button click.

@newImg: Function that changes the img state.
@startingGame: State function that changes if the game is being played or not.
*/
function IntroStateChange(
  newImg: React.Dispatch<React.SetStateAction<string>>,
  startingGame: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    startingGame(true);
    newImg(changeImg());
  }



/*
Checks to see if the correct word has been picked and if s1o
increases the counter

@param potentialWord: The word the user thinks is the correct choice.
*/
function checkWord(potentialWord : string) {
  console.log("Potential Word: " + potentialWord + " Current Word: " + currentWord);
  if (potentialWord == wordInfo[currentWord][LangIndex()]) {
    correctAnswers.push(potentialWord);
    Toast.showWithGravity("You're Correct!!", Toast.SHORT, Toast.TOP);
  } else {
    incorrectAnswers.push(potentialWord);
    Toast.showWithGravity("That wasn't the correct word.", Toast.SHORT, Toast.TOP);
  }
}

/*
Makes a dictionary out of all the words in the DB.

@param: dbh - Reference the the firestor DB.
*/
async function makeWordURLDict(randomWords: any[]) {
  
  randomWords.forEach((word) => {
      var key = word["EN"] + "";
      //[0] = URL, [1] = CN, [2] = SP
      wordInfo[key] = [word["URL"]+"", word["CH"]+"", word["SP"]+""];
      keys.push(key);
      console.log(key);
  })

}
  
  //Changes what image will be rendered for the game.
   function changeImg() {
      currentButtons = ["", "", "", ""];
      currentWord = getRandomWord();
      langButtons(challengeLanguage);
      var pic = wordInfo[currentWord][0];
      console.log(currentWord + " " + " URL: " + pic);
      return pic;
  }

  /*
  Pick a language and then will randomly pick 3 other words to be used 
  as non-correct answers for the game
  */
  function langButtons(language : string) {
    //Gets 4 random indexes
    var randomOrder : number[] = [];
    while(randomOrder.length != 4){
      var rand = getRandomIntInclusive(0,3);
      if (randomOrder.includes(rand) == false){
        randomOrder.push(rand);
      }
    }
  
    var index = LangIndex();


    //Handles giving 3 random words and the current word with its translation
    currentButtons[randomOrder[0]] = wordInfo[currentWord][index];

    var randomWords : string[] = []; //words that arent the current word
    var randCount = 1; // increase index
    while (randomWords.length != 3) {
      var tempWord = getRandomWord(); //checking to see if valid fake word
      if ((currentButtons.includes(tempWord) == false) && (tempWord != currentWord)) {
        randomWords.push(tempWord);
        //currentButtons[randomOrder[randCount]] = wordInfo[tempWord][index];
        randCount++;
      }
    }
    currentButtons[randomOrder[1]] = wordInfo[randomWords[0]][index];
    currentButtons[randomOrder[2]] = wordInfo[randomWords[1]][index];
    currentButtons[randomOrder[3]] = wordInfo[randomWords[2]][index];
    
  }

  //Function that will handle word language is being rendered to screen
  function LangIndex() {
    var index = 0;
    switch(challengeLanguage){
      case "Spanish":
        index = 2;
        break;
      default:
        index = 1;
    }
    return index;
  }


  //Gets a random word that was not the previous current word
  function getRandomWord(){
    var size = keys.length;
    var currentPicIndex = getRandomIntInclusive(0,size-1);

    var newPic = keys[currentPicIndex];
    while (newPic == currentWord) {
      currentPicIndex = getRandomIntInclusive(0,size-1)
      newPic = keys[currentPicIndex]
    }
    return newPic;
  }

  //Generates a random number that includes the given numbers
  function getRandomIntInclusive(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
  }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      alignItems: "center",
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonView: {
      padding: 5,
    },
    CMContainer: {
      alignItems: 'center',
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
      padding: 3,
      color: "black",
    },
    imageStyle:{
      width: 200, 
      height: 250,
      resizeMode: 'contain'
     },
     imgWord: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 100,
     },
     appButtonContainer2: {
      elevation: 8,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#FF9E1C",
      paddingVertical: 10,
      paddingHorizontal: 40,
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 40,
    },
    BigSeperator: {
      padding: 100,
    },
    SmallSeperator: {
      padding: 10
    },
    gameHolding: {
      top:250

    },
    imgHolder: {
      padding: 40,
      position:"relative",
      justifyContent:"center",
      alignItems:"center",
    },
    tutorialText: {
      padding: 10,
      fontSize: 20,
    }
  });