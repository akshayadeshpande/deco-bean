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
import { MemaBText } from '../components/StyledText';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

const Stack = createStackNavigator();

/**
 * Root Nav stack that will control what is being rendered at any given moment.
 * 
 * @param colorScheme Allows for the app to pass around the custom color scheme
 */
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const colorSch = useColorScheme(); //Allows app color scheme usage on the stack
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorSch].bottomTabBackground,
      }}}>
        <Stack.Screen name="StartLearning" options={{headerShown: false}} component={StartLearning}/>
        <Stack.Screen name="SignIn" options={{
          headerTitle: () => <MemaBText style={{fontSize:20,}}>SIGN IN</MemaBText>,
          headerBackTitle: null,
        headerStyle: {
          backgroundColor:Colors[colorSch].activeTint
        },
        headerTintColor: "#fff",
        headerTitleAlign:"center"}} component={SignIn}/>
        <Stack.Screen name="SignUp" options={{
          headerTitle: () =>  <MemaBText style={{fontSize:20,}}>CREATE ACCOUNT</MemaBText>,
          headerBackTitle: null,
          headerStyle: {
          backgroundColor:Colors[colorSch].activeTint
        },
        headerTintColor: "#fff",
        headerTitleAlign:"center"}} component={SignUp}/>
        <Stack.Screen name="MainApp" options={({ navigation, route }) => ({
          headerLeft: false,
          headerShown:false,
        })}
      component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//styling
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