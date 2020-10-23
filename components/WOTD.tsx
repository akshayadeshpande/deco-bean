<<<<<<< HEAD
import * as React from 'react';
import { StyleSheet, Button, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useState, useEffect, Component } from 'react';
=======
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
>>>>>>> develop

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
<<<<<<< HEAD
export default function WordOfTheday(props) {
  const [ENword, setENWord] = useState('');
  const [SPword, setSPWord] = useState('');
  const [CHword, setCHWord] = useState('');
  const [forLang, setForLang]= useState('');
  var myWord;
  useEffect(()=>{
    const getWotd = firebase.functions().httpsCallable('getWotd')
    const getUser = firebase.functions().httpsCallable('getUser')
=======
function WordOfTheday(props) {
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <View style={{flex:1, flexDirection:"row", elevation:0.3}}>
        <Image source={require('../assets/images/MEMA2.png')} style={{bottom: 35, width:75, height:75, resizeMode:"stretch"}}/>
        <Text style={{fontWeight:"bold"}}>MEMA'S WORD OF THE DAY</Text>
      </View>
    <View style={styles.container}>
      <View style={{ flex: 1,  paddingHorizontal:10, flexDirection: 'row', justifyContent:"center", alignItems:"center", backgroundColor: "#FF9E1C"}}>
        <View style={{flex: 1,  backgroundColor: "#FF9E1C", alignItems:"center",justifyContent:"center", paddingHorizontal:10}}>
          <Text style={styles.LeftWord}>{props.word}</Text>
        </View>
        <View style={{paddingVertical:40, backgroundColor: "#FF9E1C", position: "relative" , borderStartWidth: 1.5 ,borderColor:"#fff", borderWidth:1, alignItems: "center", justifyContent: "center"}}/>
        <View  style={{ flex: 1, backgroundColor: "#FF9E1C",justifyContent:"center", paddingHorizontal:20 }}>
          <Text style={styles.RightTranslation}> Translation </Text>
        </View>
      </View>
    </View>
    </View>
  )
}
>>>>>>> develop

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
      backgroundColor: "#FF9E1C",
      borderRadius: 20,
      paddingVertical: 35,
      paddingHorizontal: 5,
    },
    title: {
      fontSize: 10,
      fontWeight: 'bold',
    },
    RightTranslation: {
      fontSize: 20,
      fontWeight: "bold",
      backgroundColor: "#FF9E1C",
    },
    LeftWord: {
      fontSize: 20,
      backgroundColor: "#FF9E1C",
      fontWeight: "bold",
    }
  });

