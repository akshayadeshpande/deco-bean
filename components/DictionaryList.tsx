import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, SectionList, TouchableOpacity} from 'react-native';
// Purely for suppressing a known react native bug warning for android timers
import { YellowBox } from 'react-native';

import * as firebase from 'firebase';

import { Text } from './Themed';




export default function DictionaryList(props) {
  // Ignore that timer warning that is a known bug in react native.
  YellowBox.ignoreWarnings(['Setting a timer']);
  const [wordList, setWordList] = useState([{title: 'category', data: ['data']}]);
  populateDictionary(setWordList);

  return (
    <SectionList
      sections={wordList}
      renderItem={({item}) => 
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('WordScreen', { word: {item} })}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      }
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      keyExtractor={(item, index) => item} //Unique words only
    />
  );
}

async function populateDictionary(setWordList) {
  const db = firebase.firestore()
  const wordsRef = db.collection('WordData');
  // Create word collection with title categories
  // Right now this sorts the words into language, pending a better way to do the dictionary.
  let wordCollection = [
    {title: 'English', data: []},
    {title: 'Spanish', data: []},
    {title: 'Chinese', data: []}
  ];

  await wordsRef.get().then(data => {
    // TODO: Figure out in doc.data push: Argument of type 'any' is not assignable to parameter of type 'never'
    // It doesn't stop anythin from working...
    data.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      wordCollection.forEach(category => {
        if (category.title === 'English') {
          category.data.push(doc.data()['EN']);
        } else if (category.title === 'Spanish') {
          category.data.push(doc.data()['SP']);
        } else if (category.title === 'Chinese') {
          category.data.push(doc.data()['CH']);
        } else {
          console.log(`Failed to process ${category.title}...`)
        }
      })
    });
    // Sort
    wordCollection.forEach(category => {
      category.data.sort();
    })
    // Update
    setWordList(wordCollection);
  }).catch(error => {
    console.log(`ERROR: ${error}`)
  });
  
}

const styles = StyleSheet.create({
    item: {
      fontSize: 16,
    },
    sectionHeader: {
      margin: 10,
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,0)',
    },
    button: {
      alignItems: 'center',
      padding: 10,
    },
  });