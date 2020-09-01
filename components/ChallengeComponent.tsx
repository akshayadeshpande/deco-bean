import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';



var count = 0;

var imgs = [ 
  'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg',
  'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',
  ];

var dictWords : String[] = [];

var renderBefore = false;

var store : firebase.storage.Storage;

var dbh : firebase.firestore.Firestore;

var correctWord = "";

var currentSelections : String[];

var answeredWords = 0;

export default function ChallengeComponent(props) {
    const [img, newImg] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg');


    useEffect(() => {
        store = firebase.storage();
        dbh = firebase.firestore();
        allImg(store, imgs);
        allWords(dbh, dictWords);
    },[]);


    return (
          <View style={styles.CMContainer}>
          <Image 
                  source = {{ uri: img}}
     
                  style = {styles.imageStyle} />
    
            <Button title="Click Here To Load Image From Different Source" onPress={
              () => newImg(changeImg())
            } />
          </View>
      );
}


async function allWords(dbh : firebase.firestore.Firestore, dictWords : String[]) {
    var collRef = dbh.collection('WordData');
    await collRef.get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
      })
    }).catch(function(err){
      console.error(err);
    })
  }
  
  async function allImg (store : firebase.storage.Storage, imgs : String[]) {
  var storeRef = store.ref('Images');
  await storeRef.listAll().then(function(result) {
    result.items.forEach(function(refToImg) {
      getAllImg(refToImg);
    })
  }).catch(function(error) {
    console.error(error);
  });
  //await storeRef.child('Ball.jpg').getDownloadURL().then((url) => imgs.push(url));
  console.log(imgs);
  }
  
    async function getAllImg(refToImg : firebase.storage.Reference) {
      await refToImg.getDownloadURL().then((url) => imgs.push(url));
    }
  
    //changes what pic is being diplayed in array
   function changeImg() {
    var size = imgs.length
    var currentPicIndex = getRandomIntInclusive(0,size);
    changeCount();
    var pic = imgs[currentPicIndex];
    return pic;
  }

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