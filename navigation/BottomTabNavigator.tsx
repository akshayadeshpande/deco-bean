import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MeMaScreen from '../screens/MeMaScreen';
import WordScreen from '../screens/WordScreen';
import { BottomTabParamList, 
          HomeParamList, 
          ChallengeParamList,
          DictionaryParamList, 
          MeMaParamList,
          ProfileParamList} from '../types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

/*
Handles the Tabbar at the bottom of the app screen and what screens can be rended to the app from the Nav.
*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const iconSize = 25;


  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor={Colors[colorScheme].activeTint}
      inactiveColor={Colors[colorScheme].inactiveTint}
      barStyle={{backgroundColor:Colors[colorScheme].bottomTabBackground}}
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].activeTint, 
      //                  inactiveTintColor: Colors[colorScheme].inactiveTint,
      //                  activeBackgroundColor: Colors[colorScheme].bottomTabBackground,
      //                  inactiveBackgroundColor: Colors[colorScheme].bottomTabBackground,
      //                  style: {
      //                    height: 75,
      //                  },
      //                  labelStyle: {
      //                    fontSize: 16
      //                  }
      //               }}
      >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" size={iconSize} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={iconSize} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Words"
        component={DictionaryNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={iconSize} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Challenge"
        component={ChallengeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="gamepad" size={iconSize} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MeMa"
        component={MeMaNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot" size={iconSize} color={color} />,
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

function HomeNavigator() {
  const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'MeMa Home', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </HomeStack.Navigator>
  );
}

const ChallengeStack = createStackNavigator<ChallengeParamList>();

function ChallengeNavigator() {
  const colorScheme = useColorScheme();
  return (
    <ChallengeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <ChallengeStack.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ headerTitle: 'Challenge Mode', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </ChallengeStack.Navigator>
  );
}

const DictionaryStack = createStackNavigator<DictionaryParamList>();

function DictionaryNavigator() {
  const colorScheme = useColorScheme();
  return (
    <DictionaryStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <DictionaryStack.Screen
        name="DictionaryScreen"
        component={DictionaryScreen}
        options={{ headerTitle: 'My Words', headerTitleStyle: { alignSelf: 'center' }}}
      />
      <DictionaryStack.Screen
        name="WordScreen"
        component={WordScreen}
        options={{ headerTitle: 'Word Details', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </DictionaryStack.Navigator>
  );
}

const MeMaStack = createStackNavigator<MeMaParamList>();

function MeMaNavigator() {
  const colorScheme = useColorScheme();
  return (
    <MeMaStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <MeMaStack.Screen
        name="MeMaScreen"
        component={MeMaScreen}
        options={{ headerTitle: 'Talk to MeMa', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </MeMaStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].bottomTabBackground,
      }}}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </ProfileStack.Navigator>
  );
}
