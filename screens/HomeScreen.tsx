import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getDailyWord, WordDisplay } from '../components/WOTD';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <WordDisplay word={getDailyWord()} />
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <Text style={styles.title}>My Profile</Text>
        </View>
        <View style={styles.navBox}>
          <Text style={styles.title}>My Words</Text>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <Text style={styles.title}>Challenge</Text>
        </View>
        <View style={styles.navBox}>
          <Text style={styles.title}>MeMa</Text>
        </View>
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});
