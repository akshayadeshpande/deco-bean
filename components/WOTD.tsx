import React, { useEffect } from 'react';
import { StyleSheet, Image, } from 'react-native';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';
import EditScreenInfo from './EditScreenInfo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
/* Word of the Day Component. 
 * Allows us to plug this into a screen.
*/


/* RENDERING */
// This function needs to be upper case to be used as a component tag otherwise it thinks it's an html tag.
function WordOfTheday(props) {
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <View style={{flex:1, flexDirection:"row", elevation:0.3, right:100}}>
        <Image source={require('../assets/images/MEMA2.png')} style={{position:'relative', bottom: 55, width:75, height:75, resizeMode:"stretch"}}/>
        <View style={{position:'relative'}}>
          <Text style={{flex:1, position:"absolute",bottom:5, fontWeight:"bold", elevation:0.3}}>MEMA'S WORD OF THE DAY</Text>
        </View>
      </View>
    <View style={styles.container}>
      <View style={{ flex: 1,  paddingHorizontal:10, flexDirection: 'row', justifyContent:"center", alignItems:"center", backgroundColor: "#FF9E1C"}}>
        <View style={{flex: 1,  backgroundColor: "#FF9E1C", alignItems:"center",justifyContent:"center"}}>
          <Text style={styles.LeftWord}>{props.word.homeLangWord}</Text>
        </View>
        <View style={{paddingVertical:40, backgroundColor: "#FF9E1C", position: "relative" , borderStartWidth: 1.5 ,borderColor:"#fff", borderWidth:1, alignItems: "center", justifyContent: "center"}}/>
        <View  style={{ flex: 1,  backgroundColor: "#FF9E1C", alignItems:"center",justifyContent:"center"}}>
          <Text style={styles.RightTranslation} > {props.word.forLangWord} </Text>
        </View>
      </View>
    </View>
    </View>
  )
}

// /* Functionality */
// function getDailyWord() {
//     var dailyWord = firebase.functions().httpsCallable('getWotd');
//     dailyWord({}).then(function(result){
//       console.log(result);
//       return result
//   }).catch(function(err){
//     console.log(err);
//     return {}
//   })
// }

/* STYLES */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#FF9E1C",
      borderRadius: 20,
      paddingVertical: 50,
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
      flex: 1,
      position:"absolute",
      justifyContent:"center",
      alignItems: "center",
    },
    LeftWord: {
      fontSize: 20,
      backgroundColor: "#FF9E1C",
      fontWeight: "bold",
      elevation:0.3,
      flex: 1,
      position:"absolute",
      justifyContent:"center",
      alignItems: "center",
    }
  });

export { WordOfTheday as default}
