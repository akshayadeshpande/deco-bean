import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ChallengeScreen() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Challenge Mode</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <View style={styles.CMContainer}>
        <Text>{count}</Text>
        <Button title="ClickMe" onPress={() => setCount(count + 1)}/> 
      </View>
    </View>
  );
}

/*
export default function ChallengeScreen() {
  var i = 0;
  const testChallenge = ["This", "is", "a", "Test"];
  var word = testChallenge[i];
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Challenge Mode</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <View style={styles.CMContainer}>
        <Text style={styles.text}>
          {word}
          </Text>
          <Button
            title="New Word"
            onPress={() => i = i+ 1}
            />
      </View>
    </View>
  );
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CMContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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


/*
export default function ChallengeScreen() {
  var i = 0;
  const testChallenge = ["This", "is", "a", "Test"];
  var word = testChallenge[i];
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Challenge Mode</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <View style={styles.CMContainer}>
        <Text style={styles.text}>
          {word}
          </Text>
          <Button
            title="New Word"
            onPress={() => i = i+ 1}
            />
      </View>
    </View>
  );
}
*/