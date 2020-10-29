import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MeMaScreen from '../screens/MeMaScreen';
import WordScreen from '../screens/WordScreen';
import FriendsScreen from '../screens/FriendsScreen';
import FriendsProfileScreen from '../screens/FriendsProfileScreen';
import FriendsSearchScreen from '../screens/FriendsSearchScreen';
import * as firebase from 'firebase';

import { BottomTabParamList, 
          HomeParamList, 
          ChallengeParamList,
          DictionaryParamList, 
          MeMaParamList,
          ProfileParamList,
          } from '../types';
import { MemaBText } from '../components/StyledText';

const BottomTab = createBottomTabNavigator();

/*
Handles the Tabbar at the bottom of the app screen and what screens can be rended to the app from the Nav.
*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme(); //Gets the color scheme for the app


  //Sets up the bottom tab and renders it to screens
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor:Colors[colorScheme].background,
        inactiveBackgroundColor:Colors[colorScheme].bottomTabBackground,
        inactiveTintColor: Colors[colorScheme].inactiveTint,
        activeTintColor: Colors[colorScheme].activeTint,
      }}
      
      >
        <BottomTab.Screen
        name="Challenge"
        component={ChallengeNavigator}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/Challenge.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
        }}
      />
      <BottomTab.Screen
        name="Words"
        component={DictionaryNavigator}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/Dictionary.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/HomeButton.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
        tabBarVisible: false,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/Profile.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
        }}
      />
      <BottomTab.Screen
        name="MeMa"
        component={MeMaScreen}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/TalktoMema.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
        }}
      /> 
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string; iconSize: number }) {
  return <Ionicons size={props.iconSize} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

//Home Screen
const HomeStack = createStackNavigator<HomeParamList>();
/**
 * Handles navigation to the Home screens and adjusts the header for the page
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
function HomeNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].background,
      }}}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerTitle: () => (
          <Image source={require('../assets/images/MEMALOGO.png')}  style={styles.headerTitle}/>
        ), 
        headerTitleAlign:"center", 
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity onPress={() => {firebase.auth().signOut();navigation.navigate("StartLearning");}}>
          <Image source={require('../assets/images/SignOut.png')} style={{width:50, height:50}}/>
          </TouchableOpacity>
        )
        }}
      />
    </HomeStack.Navigator>
  );
}

//Challenge screen
const ChallengeStack = createStackNavigator<ChallengeParamList>();
/**
 * Handles navigation to the Challenge screen and adjusts the header for the page
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
function ChallengeNavigator({navigation}) {
  const colorScheme = useColorScheme();
  
  return (
    <ChallengeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].activeTint,
      }}}>
      <ChallengeStack.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ headerTitle: () => <MemaBText style={{fontSize:20,}}>Challenge Mode</MemaBText>,
        headerTintColor:"#fff", 
        headerTitleAlign: 'center',
        headerLeft: null,
        }}
      />
    </ChallengeStack.Navigator>
  );
}

//Dictionary screen
const DictionaryStack = createStackNavigator<DictionaryParamList>();
/**
 * Handles navigation to the Dictionary screens and adjusts the header for the page
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
function DictionaryNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <DictionaryStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].activeTint,
      }}}>
      <DictionaryStack.Screen
        name="DictionaryScreen"
        component={DictionaryScreen}
        options={{ headerTitle: () => <MemaBText style={{fontSize:20,}}>My Words</MemaBText>,
        headerTintColor:"#fff", 
        headerTitleAlign: 'center',
        headerLeft: null,
        }}
      />
      <DictionaryStack.Screen
        name="WordScreen"
        component={WordScreen}
        options={{ headerTitle: () => <MemaBText style={{fontSize:20,}}>Word Details</MemaBText>,
        headerTintColor:"#fff",  
        headerTitleAlign: 'center', 
        headerBackTitle: null,
      }}
      />
    </DictionaryStack.Navigator>
  );
}

//Mema Screen
const MeMaStack = createStackNavigator<MeMaParamList>();
/**
 * Handles navigation to the Mema screen and adjusts the header for the page
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
function MeMaNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <MeMaStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].activeTint,
      }}}>
      <MeMaStack.Screen
        name="MeMaScreen"
        component={MeMaScreen}
        options={{ headerTitle: 'Talk to MeMa', 
        headerTintColor:"#fff", headerTitleAlign: 'center', 
        headerLeft: null,
        }}
      />
    </MeMaStack.Navigator>
  );
}


//Profile screen
const ProfileStack = createStackNavigator<ProfileParamList>();
/**
 * Handles navigation to the Profile screens and adjusts the header for the page
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */ 
function ProfileNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].activeTint,
      }}}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: () => <MemaBText style={{fontSize:20,}}>Profile</MemaBText>,
        headerTintColor:"#fff",   
        headerTitleAlign: 'center', 
        headerLeft: null,
        headerBackTitle: null,
        }}
      />
      <ProfileStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{  headerTitle: () => <MemaBText style={{fontSize:20,}}>Friends</MemaBText>,
        headerTintColor:"#fff", 
        headerTitleAlign: 'center', 
        headerBackTitle: null,}}
      />
      <ProfileStack.Screen
        name="FriendsProfileScreen"
        component={FriendsProfileScreen}
        options={{  headerTitle: () => <MemaBText style={{fontSize:20,}}>Friends Profile</MemaBText>,
        headerTintColor:"#fff", 
        headerTitleAlign: 'center', 
        headerBackTitle: null,}}
      />
      <ProfileStack.Screen
      name="FriendsSearchScreen"
      component={FriendsSearchScreen}
      options={{ headerTitle: () => <MemaBText style={{fontSize:20,}}> Search Friends</MemaBText>,
      headerTintColor:"#fff", 
      headerTitleAlign: 'center', 
      headerBackTitle: null,}}
      />
    </ProfileStack.Navigator>
  );
}

//Styling for the bottom nav bar
const styles = StyleSheet.create({
  icon: {
    width: 32, 
    height: 32,
  },
  headerTitle: {
    width: 200, 
    height: 50,
  },
  writingStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});