import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

import { Text, View } from '../components/Themed';
import { preventAutoHide } from 'expo-splash-screen';
import DictionaryList from '../components/DictionaryList';


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

  const [activeLanguage, setActiveLanguage] = useState("English");
  console.log(`Active language set to: ${activeLanguage}`)

  return (
    <View style={styles.container}>

      <View style={styles.headingContainer}>
        <Text style={styles.title}>Pick a Language</Text>
        <Picker
          selectedValue={activeLanguage}
          style={{height: 50, width: '50%'}}
          onValueChange={(itemValue, itemIndex) => {
            setActiveLanguage(itemValue);
          }}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Chinese" value="Chinese" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
        <Text style={{marginHorizontal: 25}}>* By default language picker will show selected language
        based on profile. This is not implemented yet.
        </Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>


      <View style={styles.listContainer}>
        <DictionaryList language={activeLanguage} />

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  headingContainer: {
    flex: 2,
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
