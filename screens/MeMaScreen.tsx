import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function MeMaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imgGap}>
          <Image source={require('../assets/images/TalkMema.png')} style={styles.mema}/>
      </View>
      
      <View style={styles.imgGap}>
        <Image source={require('../assets/images/Mic.png')} style={styles.imgWrap}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    width:150,
    height:150,
    resizeMode: "stretch",
  },
  mema: {
    width: 300,
    height: 300,
  },
  imgGap: {
    padding: 50,
    alignItems:"center",
    justifyContent: "center"
  },
  container: {
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
