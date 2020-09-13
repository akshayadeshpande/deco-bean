import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Purely for suppressing a known react native bug warning for android timers
import { YellowBox } from 'react-native';
import { Text } from './Themed';
import * as firebase from 'firebase';


/*
 * DictionaryList component for Dictionary screen.
 *
 * Collects data Firestore and populates dictionary based on language.
 * 
 * Currently does not filter, and does not have search functionality.
 * 
 * @param {react.Props} props Properties passed to this screen.
 * @return DictioanryList render.
 */
export default function DictionaryList(props) {
  // Ignore that timer warning that is a known bug in react native.
  YellowBox.ignoreWarnings(['Setting a timer']);
  const navigation = useNavigation();
  // State
  const [wordList, setWordList] = useState([{title: 'category', data: ['data']}]);
  console.log("Init Dictionary List")
  console.log(`Language: ${props.language}`)

  /* useEffect is a hook that runs when the component is mounted.
   * Docs: https://reactjs.org/docs/hooks-effect.html
   * 
   * Note that there is a second argument which is an array after the arrow function:
   *  useEffect( () => {..}, []);
   * 
   * This array tells react when to use the effect. When the array is empty it will 
   * only run once on first render. So this is a good hook to use for one time db reads.
   * 
   * If the state is updated again later it should re-render based on how React Native works.
   * 
   * For instance if you want a trigger to make the effect happen again, you could set a state
   * that is a bool that when true will run the update (say with a refresh button).
   */
  useEffect(() => {
    populateDictionary(setWordList);
  }, []);
  
  return (
    <SectionList
      sections={wordList.filter(element => element.title === props.language)}
      renderItem={({item}) => 
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WordScreen', { word: {item} })}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      }
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title} Dictionary</Text>}
      keyExtractor={(item, index) => item} //Unique words only
    />
  );
}

async function populateDictionary(setWordList) {
  const db = firebase.firestore()
  const wordsRef = db.collection('WordData');
  // // Create word collection with title categories
  // // Right now this sorts the words into language, pending a better way to do the dictionary.
  console.log("Dictionary List is populating...");
  let wordCollection = [
    {title: 'English', data: []},
    {title: 'Spanish', data: []},
    {title: 'Chinese', data: []}
  ];


  await wordsRef.get().then(data => {
    // TODO: Figure out in doc.data push: Argument of type 'any' is not assignable to parameter of type 'never'
    // It doesn't stop anythin from working...
    data.forEach(doc => {
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
    console.log("Dictionary List populated...");
    console.log(wordCollection);
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