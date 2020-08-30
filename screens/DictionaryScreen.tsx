import * as React from 'react';
import { StyleSheet, Button, SectionList, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import { preventAutoHide } from 'expo-splash-screen';

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

  return (
    <View style={styles.container}>

      <View style={styles.headingContainer}>
        <Text style={styles.title}>My Words</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>

      <View style={styles.listContainer}>
        <SectionList
            sections={DictionaryData}
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
        </View>

    </View>
  );
}

const DictionaryData = [
  {title: 'A', data: ['Apple']},
  {title: 'B', data: ['Ball', 'Big']},
  {title: 'C', data: ['Car', 'Cat', 'Cold']},
  {title: 'D', data: ['Dog']},
  {title: 'E', data: ['Elephant']},
  {title: 'F', data: ['Friend']},
  {title: 'G', data: ['Goodbye']},
  {title: 'H', data: ['Happy', 'Hello', 'Home']},
  {title: 'L', data: ['Laptop']},
  {title: 'S', data: ['School', 'Small']},
  {title: 'T', data: ['Tall', 'To Eat', 'To Play', 'To Run', 'To Talk', 'To Walk']},
  {title: 'W', data: ['Warm']},
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
