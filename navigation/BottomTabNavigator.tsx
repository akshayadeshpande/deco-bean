import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from '../components/Themed';
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
import * as firebase from 'firebase';

import { BottomTabParamList, 
          HomeParamList, 
          ChallengeParamList,
          DictionaryParamList, 
          MeMaParamList,
          ProfileParamList,
          } from '../types';
import Navigation from '.';

const BottomTab = createBottomTabNavigator();

/*
Handles the Tabbar at the bottom of the app screen and what screens can be rended to the app from the Nav.
*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();


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
const HomeStack = createStackNavigator<HomeParamList>();

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
          <Image source={require('../assets/images/SignOut.png')} style={styles.icon}/>
          </TouchableOpacity>
        )
        }}
      />
    </HomeStack.Navigator>
  );
}


const ChallengeStack = createStackNavigator<ChallengeParamList>();

function ChallengeNavigator({navigation}) {
  const colorScheme = useColorScheme();
  
  return (
    <ChallengeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <ChallengeStack.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ headerTitle: "Challenge Mode", headerTintColor:"#fff", headerTitleAlign: 'center',
        headerLeft: null,
        headerRight: (props) => (
          <MaterialCommunityIcons name="exit-run" size={24} color="black" title="Sign out"
          {...props}
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("SignIn");
        }}
        />)}}
      />
    </ChallengeStack.Navigator>
  );
}

const DictionaryStack = createStackNavigator<DictionaryParamList>();

function DictionaryNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <DictionaryStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <DictionaryStack.Screen
        name="DictionaryScreen"
        component={DictionaryScreen}
        options={{ headerTitle: 'My Words', headerTintColor:"#fff", headerTitleAlign: 'center',
        headerLeft: null,
        headerRight: (props) => (
          <MaterialCommunityIcons name="exit-run" size={24} color="black" title="Sign out"
          {...props}
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("SignIn");
          }}
        />)}}
      />
      <DictionaryStack.Screen
        name="WordScreen"
        component={WordScreen}
        options={{ headerTitle: 'Word Details', headerTintColor:"#fff",  headerTitleAlign: 'center', }}
      />
    </DictionaryStack.Navigator>
  );
}

const MeMaStack = createStackNavigator<MeMaParamList>();

function MeMaNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <MeMaStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <MeMaStack.Screen
        name="MeMaScreen"
        component={MeMaScreen}
        options={{ headerTitle: 'Talk to MeMa', headerTintColor:"#fff", headerTitleAlign: 'center', headerLeft: null,
        headerRight: (props) => (
          <MaterialCommunityIcons name="exit-run" size={24} color="black" title="Sign out"
          {...props}
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("SignIn");
          }}
        />)}}
      />
    </MeMaStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator({navigation}) {
  const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerTintColor:"#fff",   headerTitleAlign: 'center', headerLeft: null,
        headerRight: (props) => (
          <MaterialCommunityIcons name="exit-run" size={24} color="black" title="Sign out"
          {...props}
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("SignIn");
          }}
        />)}}
      />
      <ProfileStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{ headerTitle: 'Friends', headerTintColor:"#fff", headerTitleAlign: 'center', }}
      />
      <ProfileStack.Screen
        name="FriendsProfileScreen"
        component={FriendsProfileScreen}
        options={{ headerTitle: 'Friends Profile', headerTintColor:"#fff", headerTitleAlign: 'center', }}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40, 
    height: 40,
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