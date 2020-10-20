import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

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

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

/*
Handles the Tabbar at the bottom of the app screen and what screens can be rended to the app from the Nav.
*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();


  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor={Colors[colorScheme].activeTint}
      inactiveColor={Colors[colorScheme].inactiveTint}
      barStyle={{backgroundColor:Colors[colorScheme].bottomTabBackground}}
      >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Image
          source={require('../assets/images/HomeButton.png')}
          fadeDuration={0}
          style={styles.icon}
        />,
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
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: () => (
          <Image source={require('../assets/images/MEMALOGO.png')}  style={styles.headerTitle}/>
        ), 
        headerTitleAlign:"center", 
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
        options={{ headerTitle: 'Challenge Mode', headerTitleStyle: { alignSelf: 'center' },
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
        options={{ headerTitle: 'My Words', headerTitleStyle: { alignSelf: 'center' },
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
        options={{ headerTitle: 'Word Details', headerTitleStyle: { alignSelf: 'center' }, }}
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
        options={{ headerTitle: 'Talk to MeMa', headerTitleStyle: { alignSelf: 'center' }, headerLeft: null,
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
        options={{ headerTitle: 'Profile', headerTitleStyle: { alignSelf: 'center' }, headerLeft: null,
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
        options={{ headerTitle: 'Friends', headerTitleStyle: { alignSelf: 'center' }, }}
      />
      <ProfileStack.Screen
        name="FriendsProfileScreen"
        component={FriendsProfileScreen}
        options={{ headerTitle: 'Friends Profile', headerTitleStyle: { alignSelf: 'center' }, }}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25, 
    height: 25,
  },
  headerTitle: {
    width: 200, 
    height: 50,
  }
});