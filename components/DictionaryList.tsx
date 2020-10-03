import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Purely for suppressing a known react native bug warning for android timers
import { YellowBox } from 'react-native';
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
  // Ignore that timer warning that is a known bug in react native.
  YellowBox.ignoreWarnings(['Setting a timer']);
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
   * This array tells react when to use the effect. When the array is empty it will 
   * only run once on first render. So this is a good hook to use for one time db reads.
   * 
   * If the state is updated again later it should re-render based on how React Native works.
   * 
   * For instance if you want a trigger to make the effect happen again, you could set a state
   * that is a bool that when true will run the update (say with a refresh button).
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
          <Text style={styles.headerText}>{section.title} Dictionary</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('WordScreen', { word: item.word, translation: item.translation, imgURL: item.imgURL })}>
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

function constructWordList(language, wordData, setWordList) {
  // My Words is just dummy data for now
  let wordList = [{title: language, data: []}]
  // Construct active word list, default translation is English
  wordData.forEach(wordDoc => {
    switch(language) {
      case 'Chinese':
        wordList[0].data.push({'word': wordDoc['CH'], 'translation': wordDoc['EN'], 'imgURL': wordDoc['URL']});
        break;
      case 'English':
        wordList[0].data.push({'word': wordDoc['EN'], 'translation': wordDoc['EN'], 'imgURL': wordDoc['URL']});
        break;
      case 'Spanish':
        wordList[0].data.push({'word': wordDoc['SP'], 'translation': wordDoc['EN'], 'imgURL': wordDoc['URL']});
        break;
      default:
        break;
    }
  });
  // Sort by language
  // wordList[0].data.sort((data1, data2) => {
  //   return data1.word.localeCompare(data2.word)
  // });
  setWordList(wordList);

}


const styles = StyleSheet.create({
    sectionHeader: {
      padding: 10,
      marginBottom: 2,
      backgroundColor: 'rgba(44, 130, 201, 1)',
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