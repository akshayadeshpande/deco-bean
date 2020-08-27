import * as React from 'react';
import { StyleSheet, Button, Image, Platform } from 'react-native';
import { useState, useEffect, Component } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';




var count = 0;

var imgs = [ 
  'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg',
  'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',
  ];

  var renderBefore = false;

  var store : firebase.storage.Storage;


export default function ChallengeScreen() {
  /*There is something with react that makes it unable to call function in useState to initalize
    so a default pic must be used or the first image url must be given and the inital state
    and the first value of the images array below
  */

  if (!renderBefore) {
    store = firebase.storage();
    allImg(store, imgs);
    renderBefore = true;
  }
 
  
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
          () => newImg(changeImg(store))
        } />
      </View>
    </View>
  );
}

  async function allImg (store : firebase.storage.Storage, imgs : String[]) {
  var storeRef = store.ref('Images');
  await storeRef.listAll().then(function(result) {
    result.items.forEach(function(refToImg) {
      getAllImg(refToImg);
    })
  }).catch(function(error) {
    console.error(error);
  });
  //await storeRef.child('Ball.jpg').getDownloadURL().then((url) => imgs.push(url));
  console.log(imgs);
}

  async function getAllImg(refToImg : firebase.storage.Reference) {
    await refToImg.getDownloadURL().then((url) => imgs.push(url));
  }

 function changeImg(store : firebase.storage.Storage) {
  var size = imgs.length
  changeCount(size);
  var pic = imgs[count];
  return pic;
}

function changeCount(size: number) {
  if (count == (size - 1)) {
    count = 0;
  } else {
    count = count + 1;
  }
  console.log("New Press");
  console.log(count);
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