import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { getDailyWord } from '../components/WOTD';
import WordOfTheDay from '../components/WOTD';
import NavTouchButton from '../components/NavTouchButton';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>

      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Profile" text="My Profile" iconName="user"/>
        </View>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Words" text="My Words" iconName="book"/>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton screenName="Challenge" text="Challenge Mode" iconName="gamepad"/>
        </View>
        <View style={styles.navBox}>
          <NavTouchButton screenName="MeMa" text="Talk to MeMa" iconName="comments-o"/>
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
