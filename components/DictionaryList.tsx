import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Purely for suppressing a known react native bug warning for android timers
import { YellowBox } from 'react-native';
import { Text } from './Themed';



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
  console.log("Init Dictionary List")
  console.log(`Language: ${props.language}`)
  console.log(wordList)

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
      renderItem={({item}) => 
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WordScreen', { word: item.word, translation: item.translation, imgURL: item.imgURL })}>
          <Text style={styles.item}>{item.word}</Text>
          <Text style={styles.item}>Translation: {item.translation}</Text>
        </TouchableOpacity>
      }
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title} Dictionary</Text>}
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
  wordList[0].data.sort((data1, data2) => {
    return data1.word.localeCompare(data2.word)
  });
  setWordList(wordList);

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