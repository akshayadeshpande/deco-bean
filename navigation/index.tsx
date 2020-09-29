import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

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
import MainApp from './BottomTabNavigator'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

const Stack = createStackNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="MainApp" options={{
          headerTitle: "Sign Out",
        }} component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const RootStack = createStackNavigator({navigation}) => (
//   <RootStack.Navigator screenOptions={{ headerShown: false }}>
//       <RootStack.Screen name="SignInScreen" component={SignIn}/>
//       {/* <RootStack.Screen name="Root" component={BottomTabNavigator} />
//       <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
//     </RootStack.Navigator>
// );
// linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
{/* <Stack.Screen name="Challenge" component={Challenge}/>
        <Stack.Screen name="Dictionary" component={Dictionary}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="MeMa" component={MeMa}/> */}