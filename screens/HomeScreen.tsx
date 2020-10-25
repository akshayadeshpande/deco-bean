import * as React from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';
// import { getDailyWord } from '../components/WOTD';
import WordOfTheDay from '../components/WOTD';
import NavTouchButton from '../components/NavTouchButton';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


export default function HomeScreen({navigation}) {
  const colorScheme = useColorScheme(); // App colors
  const [dailyWord, setDailyWord] = useState({}); //Word of the Day
  const [loading, setLoading] = useState(true);

  //gets information about the current user that is logged in and changes the state
  useEffect(() => {
    var dailyWord = firebase.functions().httpsCallable('getWotd');
    dailyWord({}).then(function(result){
        setDailyWord(result.data);
        setLoading(false);
    }).catch(function(err){
      console.log(err);
      alert("An error occur, please try to login again. ")
    })
  },[]);

  return (
    <View style={{flex:1}}>
    
    <View style={styles.wrapper}>
      
      <View style={styles.container}>

        { loading ? 
           <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
          : 
          <TouchableOpacity onPress={() => navigation.navigate('Words', 
                {screen:'WordScreen', initial: false, params: {
                    word: dailyWord.homeLangWord, 
                    translation: dailyWord.forLangWord, 
                    imgURL: dailyWord.word.URL, 
                    soundURI: dailyWord.word.Audio[dailyWord.userForLang]
                    },   
                },
            )}>
            <View style={styles.WOTDWrapper}>
                <WordOfTheDay word={dailyWord}/>
            </View>
          </TouchableOpacity>         
        }
        
      </View>

      <View style={styles.containerRow}>
          <NavTouchButton screenName="Challenge" text="Challenge Mode" iconName={require("../assets/images/Challenge.png")}/>
          <NavTouchButton screenName="Words" text="My Words" iconName={require("../assets/images/Dictionary.png")}/>
      </View>

      <View style={styles.containerRow}>
          <NavTouchButton screenName="Profile" text="My Profile" iconName={require("../assets/images/Profile.png")}/>
          <NavTouchButton screenName="MeMa" text="Talk to MeMa" iconName={require("../assets/images/TalktoMema.png")}/>
      </View>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
   WOTDWrapper: {
    flex: 0.5, 
    paddingHorizontal: 40, 
    paddingVertical: 100, 
    alignItems: "center", 
    justifyContent: "center",
    
  },
  headerTitle: {
    width: 200, 
    height: 50,
  },
  container: {
    flex: 1,
    position:"relative",
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center"
  },
  navBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    width: 30, 
    height: 30,
  },

});
