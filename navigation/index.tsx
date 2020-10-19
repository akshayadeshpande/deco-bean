import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as firebase from 'firebase';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SignIn from '../screens/Signin'
import SignUp from '../screens/Register'
import Challenge from '../screens/ChallengeScreen'
import Home from '../screens/HomeScreen'
import Dictionary from '../screens/DictionaryScreen'
import MeMa from '../screens/MeMaScreen'
import Profile from '../screens/ProfileScreen'
import ChangeEmail from "../screens/ChangeEmail";
import MainApp from './BottomTabNavigator'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

const Stack = createStackNavigator();

//Root stack object that allows Sign in and sign up.
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const colorSch = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorSch].bottomTabBackground,
      }}}>
        <Stack.Screen name="SignIn" options={{headerTitle:"Mema", headerTitleAlign:"center"}} component={SignIn}/>
        <Stack.Screen name="SignUp" options={{headerTitle:"Mema", headerTitleAlign:"center"}} component={SignUp}/>
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
        <Stack.Screen name="MainApp" options={({ navigation, route }) => ({
          headerLeft: false,
          headerShown:false,
        })}
      component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
