import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function ChallengeScreen() {
  const [img, newImg] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg');
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Challenge Mode</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <View style={styles.CMContainer}>
      <Image 
              source = {{ uri: img}}
 
              style = {styles.imageStyle} />

        <Button title="Click Here To Load Image From Different Source" onPress={
          () => newImg('https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg')
        } />
      </View>
    </View>
  );
}

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
  },
  imageStyle:{
    width: 200, 
    height: 300, 
    resizeMode: 'center'
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