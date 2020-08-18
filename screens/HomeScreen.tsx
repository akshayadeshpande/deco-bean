import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

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
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>Main Page Content and Navigation. 
        This will be changed to the main navigation home page that greets the user as per proposal page 54. 
        Or to what design comes up with! If we stick with proposed navigation we will change the current tab navigation method.
      </Text>
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
    flex: 2,
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
