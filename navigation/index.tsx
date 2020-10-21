import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image, StyleSheet } from 'react-native';
import SignIn from '../screens/Signin'
import StartLearning from '../screens/StartLearning';
import SignUp from '../screens/Register'
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
        <Stack.Screen name="StartLearning" options={{headerShown: false}} component={StartLearning}/>
        <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn}/>
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp}/>
        <Stack.Screen name="MainApp" options={({ navigation, route }) => ({
          headerLeft: false,
          headerShown:false,
        })}
      component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
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