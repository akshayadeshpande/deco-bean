import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from './Themed';



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
  const navigation = useNavigation();
  // State
  const [wordList, setWordList] = useState(
    [{title: 'category', data: [{word: 'word', translation: 'translation'}]}]
  );

  /* useEffect is a hook that runs when the component is mounted.
   * Docs: https://reactjs.org/docs/hooks-effect.html
   * 
   * Note that there is a second argument which is an array after the arrow function:
   *  useEffect( () => {..}, []);
   * 
   */
  useEffect(() => {
    // Construct a word list if wordData, userWords, or selected language has changed.
    constructWordList(props.language, props.wordData, setWordList)
  }, [props.wordData, props.language]);
  
  return (
    <SectionList
      sections={wordList}
      renderSectionHeader={({section}) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('WordScreen', { word: item.word, translation: item.translation, imgURL: item.imgURL, soundURI: item.soundURI })}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.word}</Text>
                <Text style={styles.listText}>Translation: {item.translation}</Text>
              </View>
              <View style={styles.listArrow}>
                <FontAwesome name="chevron-right" size={16} color="black" />
              </View>
            </View>
          </TouchableOpacity>
      )}
      
      keyExtractor={(item, index) => item.word} //Unique words only
    />
  );
}

/*
 * Construct the word list that will be showing for browsing and selection.
 * @param {string} language User's learning language.
 * @param {Object} wordData Object containing docs pulled from word DB collection
 * @param {function}  setWordList Setter function for word list state.
 */
function constructWordList(language, wordData, setWordList) {
  if (wordData.length === 0) {
    return;
  }
  let wordList = [{title: "Dictionary", data: []}]
  // Construct active word list, default translation is English
  wordData.forEach(wordDoc => {
    wordList[0].data.push(
      {
        'word': wordDoc[language], 
        'translation': wordDoc['EN'], 
        'imgURL': wordDoc['URL'], 
        'soundURI': wordDoc['Audio'] ? wordDoc['Audio'][language] : ""
      }
    );
  });
  // Delete undefined objects - not sure why they are appearing.
  wordList[0].data = wordList[0].data.filter(data => data.word != null);

  // Sort by translation
  wordList[0].data.sort((data1, data2) => {
    return data1.translation.localeCompare(data2.translation)
  });
  setWordList(wordList);

}


const styles = StyleSheet.create({
    sectionHeader: {
      padding: 10,
      marginTop: 60,
      // backgroundColor: 'rgba(44, 130, 201, 1)',
      backgroundColor: '#2D9CDB',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,
      elevation: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 30,
    },
    listItemContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: 'rgba(241, 130, 141,1)',
      borderBottomWidth: 2,
      marginBottom: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,
      elevation: 2,
    },
    listItem: {
      padding: 10,
    },
    listText: {
      fontSize: 20,
    },
    listArrow: {
      padding: 10,
      justifyContent: "center",
    }
  });