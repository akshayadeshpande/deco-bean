import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { getDailyWord } from '../components/WOTD';
import WordOfTheDay from '../components/WOTD';
import NavTouchButton from '../components/NavTouchButton';
import * as firebase from 'firebase';


export default function HomeScreen({navigation}) {
 
  return (
    <View style={styles.wrapper}>

      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Profile" text="My Profile" iconName={require("../assets/images/Profile.png")}/>
        </View>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Words" text="My Words" iconName={require("../assets/images/Dictionary.png")}/>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Challenge" text="Challenge Mode" iconName={require("../assets/images/Challenge.png")}/>
        </View>
        <View style={styles.navBox}>
          <NavTouchButton screenName="MeMa" text="Talk to MeMa" iconName={require("../assets/images/TalktoMema.png")}/>
        </View>
      </View>

      <View style={styles.container}>
          <WordOfTheDay word={getDailyWord()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
});
