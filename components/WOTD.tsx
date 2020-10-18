import * as React from 'react';
import { StyleSheet, Button, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
/* Word of the Day Component. 
 * Allows us to plug this into a screen.
*/

/* RENDERING */
// This function needs to be upper case to be used as a component tag otherwise it thinks it's an html tag.
export default function WordOfTheday(props) {
  const [ENword, setENWord] = useState('');
  const [SPword, setSPWord] = useState('');
  const [CHword, setCHWord] = useState('');
  const [forLang, setForLang]= useState('');
  var myWord;
  useEffect(()=>{
    const getWotd = firebase.functions().httpsCallable('getWotd')
    const getUser = firebase.functions().httpsCallable('getUser')

    getUser({}).then((result) => {
      let user = result.data.user
      console.log(user)
      setForLang(user.forLang)
    }).catch(function(err){
      console.log(err)
    })
    getWotd({}).then((result) => {
      let wotd = result.data.word
      console.log(wotd)
        setSPWord(wotd.SP)
        setENWord(wotd.EN)
        setCHWord(wotd.CH)
    }).catch(function(err){
      console.log(err)
    })
  },[])
    if(forLang == "Spanish"){
      myWord = SPword
    } else if (forLang == "English"){
      myWord = ENword
    } else{
      myWord = CHword
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Word of the Day</Text>
        <Text style={styles.text}>{myWord}</Text>
      </View>
    )
}

/* STYLES */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 30,
    }
  });

