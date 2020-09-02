import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';



var count = 0;


var dictWords : String[] = [];

var renderBefore = false;

var store : firebase.storage.Storage;

var dbh : firebase.firestore.Firestore;

var currentSelections : string[];

var answeredWords = 0;

var wordInfo : {[key:string] : string[] } = {};

var currentWord : string;

var currentButtons = ["", "", "", ""];

var keys : string[] = [];

var begin = false;
export default function ChallengeComponent(props) {

  //Runs on the first launch to get all the needed information for the game
    useEffect(() => {
        store = firebase.storage();
        dbh = firebase.firestore();
        makeWordURLDict(dbh);

        // allWords(dbh, dictWords);
        // allImg(store);
        
    },[]);
    //TODO: Need a new default pic to begin
    const [img, newImg] = useState('https://firebasestorage.googleapis.com/v0/b/bean-f1602.appspot.com/o/Images%2FApple.jpg?alt=media&token=9405ab95-7b0a-496a-9aa3-e20bff7d7bc4&fbclid=IwAR0iCEQseF7ZLiuCeyd0IOKn561XsYZSFOBiRXQHFV-R5vvVuoRPMOAfsnc');


    return (
        <View style={styles.CMContainer}>
        <Image 
                source = {{ uri: img}}
    
                style = {styles.imageStyle} />
      
        <Button title="Begin CH challenge" onPress={
            () => newImg(changeImg())
        } />
         </View>
      );
}

//Makes a dictionary out of all the words in the DB
async function makeWordURLDict(dbh : firebase.firestore.Firestore) {
  var collRef = dbh.collection('WordData');
  await collRef.get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      var data = doc.data();
      var key = data["EN"] + "";
      //[0] = URL, [1] = CN, [2] = SP

      wordInfo[key] = [data["URL"]+"", data["CH"]+"", data["SP"]+""];
      keys.push(key);
    })
  })
}


  
  // async function allImg (store : firebase.storage.Storage) {
  // var storeRef = store.ref('Images');
  // await storeRef.listAll().then(function(result) {
  //   result.items.forEach(function(refToImg) {
  //     getAllImg(refToImg);
  //   })
  // }).catch(function(error) {
  //   console.error(error);
  // });
  
  // }
  
  //   async function getAllImg(refToImg : firebase.storage.Reference) {
  //     await refToImg.getDownloadURL().then(function(link) {

  //     });
  //   }
  
    //changes what pic is being diplayed in array
   function changeImg() {
    
    currentWord = getRandomWord();
    var pic = wordInfo[currentWord][0];
    return pic;
  }

  /*
  Pick a language and then will randomly pick 3 other words to be used 
  as non-correct answers for the game
  */
  function langButtons(language : string) {
    var randomOrder : number[] = [];
    while(randomOrder.length != 4){
      var rand = getRandomIntInclusive(0,4);
      if (!(randomOrder.includes(rand))){
        randomOrder.push(rand);
      }
    }
    var index = 0;
    switch(language){
      case "SP":
        index = 2;
        break;
      default:
        index = 1;
    }


    //Handles giving 3 random words and the current word with its translation
    currentButtons[randomOrder[0]] = wordInfo[currentWord][index];

    var randomWords : string[] = []; //words that arent the current word
    var randCount = 1; // increase index
    while (randomWords.length != 3) {
      var tempWord = getRandomWord(); //checking to see if valid fake word
      if ((currentButtons.includes(tempWord) == false) && (tempWord != currentWord)) {
        randomWords.push(tempWord);
        currentButtons[randomOrder[randCount]] = wordInfo[tempWord][index];
        randCount++;
      }
    }
    
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

    console.log(newPic + " " + currentPicIndex);
    return newPic;
  }

  //Generates a random number that includes the given numbers
  function getRandomIntInclusive(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
  }
  
  function changeCount() {
    answeredWords = answeredWords + 1;
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