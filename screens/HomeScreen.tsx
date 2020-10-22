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
          <WordOfTheDay word={getDailyWord()} />
      </View>

      <View style={styles.containerRow}>

        <View style={styles.navBox}>
          <NavTouchButton screenName="Challenge" text="Challenge Mode" iconName={require("../assets/images/Challenge.png")}/>
        </View>

        

        <View style={styles.navBox}>
          <NavTouchButton screenName="Words" text="My Words" iconName={require("../assets/images/Dictionary.png")}/>
        </View>

      </View>

      <View style={styles.containerRow}>

        <View style={styles.navBox}>
          <NavTouchButton screenName="Profile" text="My Profile" iconName={require("../assets/images/Profile.png")}/>
        </View>

        <View style={styles.navBox}>
          <NavTouchButton screenName="MeMa" text="Talk to MeMa" iconName={require("../assets/images/TalktoMema.png")}/>
        </View>

      </View>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerTitle: {
    width: 200, 
    height: 50,
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
  icon: {
    width: 30, 
    height: 30,
  },
});
