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
      <Text style={styles.text}>"My Words" Dictionary</Text>
      </View>

      <View style={styles.containter2}>
      <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => item} //Unique words only
        />

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