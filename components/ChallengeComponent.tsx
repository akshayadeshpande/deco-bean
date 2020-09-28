import * as React from 'react';
import { StyleSheet, Button, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var count = 0;


var dbh : firebase.firestore.Firestore;

var wordInfo : {[key:string] : string[] } = {};

var currentWord : string;

var currentButtons : string[];

var keys : string[] = [];

var challengeLanguage = "";

var correctAnswers = 0;


export default function ChallengeComponent(props) {

  //Runs on the first launch to get all the needed information for the game
    useEffect(() => {
        dbh = firebase.firestore();
        var incomingWords = firebase.functions().httpsCallable('getRandomWords')
        incomingWords({}).then(function(result){
        makeWordURLDict(result.data['output']);
        }).catch(function(err){
          console.log(err);
        })
         
    },[]);
    //TODO: Need a new default pic to begin OR somehow have a better original state
    const [img, newImg] = useState('https://firebasestorage.googleapis.com/v0/b/bean-f1602.appspot.com/o/Images%2FApple.jpg?alt=media&token=9405ab95-7b0a-496a-9aa3-e20bff7d7bc4&fbclid=IwAR3Nv9bvimEEo4_nyN_IZpNO05bcMtC0Mhim50DEmqsg5JWkkJy7eYHCFX0');
    const [start, startingGame] = useState(false)
    const [answ, setCount] = useState(0)
    const [tutorial, setTut] = useState(false)

    // Original Language Pick
    if (start == false && tutorial == false) {
      return (

        <View style={styles.CMContainer}>   
        <Button title="Begin CH challenge" onPress={ () =>
            IntroStateChange(newImg, startingGame, "CH")
           } />
        <Button title="Begin SP challenge" onPress={ () =>
          IntroStateChange(newImg, startingGame, "SP")
        } />
        <Button title='Tutorial' onPress={() =>
          inTut(setTut, true)
        }/>
        </View>

      );
    } else if (tutorial == true) {

      return (
        <View style={styles.CMContainer}>
          <Image 
                  source = {{ uri: img}}
      
                  style = {styles.imageStyle} />
        
          <Button title={"Tutorial Button 1"} onPress={
              () => inTut(setTut, false)} />
          <Button title={"Tutorial Button 2"} onPress={
          () => inTut(setTut, false)} />
          <Button title={"Tutorial Button 3"} onPress={
          () => inTut(setTut, false)} />
          <Button title={"Tutorial Button 4"} onPress={
          () => inTut(setTut, false)} />
          <Text>
            Challenge mode works by displaying and image at the top of the screen, depicting
            a word you have seen before through some other form of learning on MeMa. Underneath 
            gives you 4 clickable buttons with words on them from the language(s) you
            are learning. Your task will be to select the correct word that represents the picture,
            10 times, then your score will be recorded on your profile so it can be viewed later. 
            
            Press any button to be taken back to the game menu.
          </Text>
          </View>
      );
    } else {
      // Final view for how many correct answes
      if (answ == 10) {
        return (
          <View style={styles.CMContainer}>
          <Text>You got {correctAnswers}/10</Text>
          <Button title="Play Again?" onPress={
              () => playAgain(setCount, startingGame)} />
          </View>
        );
      } else {
        //View while playing giving the images and the button choices
        return (
          <View style={styles.CMContainer}>
          <Image 
                  source = {{ uri: img}}
      
                  style = {styles.imageStyle} />
        
          <Button title={currentButtons[0]} onPress={
              () => finalStateChange(answ, setCount, newImg, currentButtons[0])} />
          <Button title={currentButtons[1]} onPress={
          () => finalStateChange(answ, setCount, newImg, currentButtons[1])} />
          <Button title={currentButtons[2]} onPress={
          () => finalStateChange(answ, setCount, newImg, currentButtons[2])} />
          <Button title={currentButtons[3]} onPress={
          () => finalStateChange(answ, setCount, newImg, currentButtons[3])} />
           </View>
        );
      }
    }
}

function playAgain(
  setCount: React.Dispatch<React.SetStateAction<number>>,
  startingGame: React.Dispatch<React.SetStateAction<boolean>>
) {
  setCount(0)
  startingGame(false)
}

function finalStateChange(
  answ: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  newImg: React.Dispatch<React.SetStateAction<string>>,
  potentialWord : string) {
    checkWord(potentialWord);
    newImg(changeImg());
    setCount(answ + 1);
}

//Allows 2 state changes at once to get the first pic
function IntroStateChange(
  newImg: React.Dispatch<React.SetStateAction<string>>,
  startingGame: React.Dispatch<React.SetStateAction<boolean>>,
  pickedLang : string) {
    startingGame(startGame(pickedLang));
    newImg(changeImg());
  }

function inTut(setTut: React.Dispatch<React.SetStateAction<boolean>>, tut : boolean) {
  setTut(tut);
}

function startGame(lang : string) {
  var begin = true;
  challengeLanguage = lang;
  return begin
}

/*
Checks to see if the correct word has been picked and if so
increases the counter

@param potentialWord: The word the user thinks is the correct choice.
*/
function checkWord(potentialWord : string) {
  console.log("Potential Word: " + potentialWord + " Current Word: " + currentWord);
  if (potentialWord == wordInfo[currentWord][LangIndex()]) {
    correctAnswers++;
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
  
    //changes what pic is being diplayed in array
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

  function LangIndex() {
    var index = 0;
    switch(challengeLanguage){
      case "SP":
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
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    CMContainer: {
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
    },
    imageStyle:{
      width: 200, 
      height: 300, 
      resizeMode: 'center'
     }
  });