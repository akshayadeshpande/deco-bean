import * as React from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { View } from '../components/Themed';
import WordOfTheDay from '../components/WOTD';
import NavTouchButton from '../components/NavTouchButton';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


/*
 * Home Screen is the heart of MeMa, the navigation hub that greets users upon logging in.
 *
 * The word of the day is also loaded for the user's viewing pleasure.
 *
 * @param {react.Props} props Props object, contains navigation object.
 * @return Renders for the home page.
 */
export default function HomeScreen({navigation}) {
  const colorScheme = useColorScheme(); // App colors
  const [dailyWord, setDailyWord] = useState({}); //Word of the Day
  const [loading, setLoading] = useState(true); //Determines if the information is being gathered or not

  //Loads when the screen is called, this will get data about the users current WOTD
  useEffect(() => {
    setTimeout(() => {
      var dailyWord = firebase.functions().httpsCallable('getWotd');
      dailyWord({}).then(function(result){
        setDailyWord(result.data);
        setLoading(false);
      }).catch(function(err){
        console.log(err);
        Alert.alert("An error ocurred, please log in again")
      })
    }, 5000)
  },[]);

  if (loading) { //Gives loading prompt will information is being gathered.
    return(
      <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
      </View>
    )
  } else { //Renders the home screen to the user with all the option of the app along with WOTD.
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

}

//Styling of the screen
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
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
