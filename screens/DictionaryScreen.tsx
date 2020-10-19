import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import SearchBar from 'react-native-searchbar';
import * as firebase from 'firebase';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DictionaryList from '../components/DictionaryList';
import 'firebase/functions';


/*
 * Dictionary screen retrieves word list from db for navigation.
 *
 * Upon navigation, dictionary will pass key parameters to the Word Screen for
 * db retrieval and rendering functions.
 * 
 * The list uses touchable opacity on the list items to allow for unique navigation.
 * Parameters passed to the WordScreen ensures that we only need one generic WordScreen.
 * 
 * @param {react.Props} props Properties passed to this screen.
 * @return Dictioanry Screen render.
 */
export default function DictionaryScreen(props) {
  const colorScheme = useColorScheme();
  const isFocused = useIsFocused();
  let searchBar;
  // States
  const [activeLanguage, setActiveLanguage] = useState("");
  // Dictionary data contains full db word lists
  const [dictionaryData, setDictionaryData] = useState([]);
  // Filtered dict based on search results, none == all.
  const [filteredDict, setFilteredDict] = useState([]);
  const [userWords, setUserWords] = useState([{'language': 'Spanish', 'words': ['Manzana, Pelota, Grande']}]);

  /* useEffect is a hook that runs when the component is mounted.
   * Docs: https://reactjs.org/docs/hooks-effect.html
   * 
   * Note that there is a second argument which is an array after the arrow function which tells useEffect when to 
   * run/which states to track before activating:
   *  useEffect( () => {..}, []);  // [] == only run on mount.
   * 
   * Currently dictionary does not receive real time updates.
   * 
   * Will run a db call on first mount.
   */
  useEffect(() => {
    getWords(setDictionaryData, setFilteredDict);
    getLearnerLanguage(setActiveLanguage);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        ref={(ref) => searchBar = ref}
        allDataOnEmptySearch={true}
        data={dictionaryData}
        placeholder="Type to search for words"
        handleResults={(results) => {
          // console.log("Search Results: ");
          // console.log(results);
          setFilteredDict(results);
        }}
        showOnLoad={true}
        hideBack={true}
        backgroundColor={Colors[colorScheme].bottomTabBackground}
        iconColor={Colors[colorScheme].tabIconDefault}
        textColor="#FF9E1C"
        placeholderTextColor="#fff"
      />

      <View style={styles.listContainer}>
        <DictionaryList 
          language={activeLanguage} 
          wordData={filteredDict} 
          userWords={userWords}
        />
      </View>

    </View>
  );
}

/*
 * DICTIONARY PARENT FUNCTIONS
 */

/*
 * Retrieve words from firestore.
 * @param setWordData {function} Sets the wordData state.
 */
async function getWords(setDictionaryData, setFilteredDict) {
  const db = firebase.firestore()
  const wordsRef = db.collection('WordData');
  // Create word collection with title categories
  // Right now this sorts the words into language, pending a better way to do the dictionary.
  console.log("Dictionary data is loading...");
  // myWords is a dummy collection for user words.
  let dictionary = [];

  await wordsRef.get().then(data => {
    // TODO: Figure out in doc.data push: Argument of type 'any' is not assignable to parameter of type 'never'
    // It doesn't stop anythin from working...
    data.forEach(doc => {
        dictionary.push(doc.data());
    })
  }).catch(error => {
    console.log("Error in getWords(), DictionaryScreen.");
    console.log(error);
  });
  console.log("Dictionary data retrieved.");
  // console.log(dictionary);
  setDictionaryData(dictionary);
  setFilteredDict(dictionary);
}

/*
 * Retrieve user's learner/target language.
 */
async function getLearnerLanguage(languageSetter) {
  let userData = firebase.functions().httpsCallable('getUser')
  await userData({}).then((res) => {
    const language = res.data.user.forLang.slice(0, 2).toUpperCase();
    languageSetter(language);
    console.log(`Active language set to: ${language}`);
  }).catch(err => console.log(err));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    alignItems: 'center',
    marginTop: 75,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,0)',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
});
