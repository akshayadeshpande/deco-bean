import * as React from 'react';
import { StyleSheet, Button, SectionList, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import NavTouchButton from '../components/NavTouchButton';
import { createStackNavigator } from '@react-navigation/stack';
import { OWParamList } from '../types';
import OWScreen from '../screens/OWScreen';

export default function DictionaryScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.headingContain}>
      <Text style={styles.title}>My Words</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>

    <View style={styles.containter2}>
      <SectionList
          sections={DictionaryData}
          renderItem={({item}) => <NavTouchButton screenName="Home" text={item} />}
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
  headingContain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containter2: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,0)',
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

const OWStack = createStackNavigator<OWParamList>();

function WOTDNavigator() {
  return (
    <OWStack.Navigator>
      <OWStack.Screen
        name="OldWordScreen"
        component={OWScreen}
        options={{ headerTitle: 'Word of the Day', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </OWStack.Navigator>
  );
}