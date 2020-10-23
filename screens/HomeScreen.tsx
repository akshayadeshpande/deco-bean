import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { getDailyWord } from '../components/WOTD';
import WordOfTheDay from '../components/WOTD';
import NavTouchButton from '../components/NavTouchButton';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeScreen({navigation}) {
 
  return (
    <View style={{flex:1}}>
    
    <View style={styles.wrapper}>
      
      <View style={styles.container}>
        <View style={styles.WOTDWrapper}>
          <WordOfTheDay word={getDailyWord()} />
        </View>
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
    padding: 20, 
    paddingHorizontal: 40, 
    paddingVertical:10, 
    alignItems: "center", 
    justifyContent: "center"
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
  seperator: {
    

  },
});
