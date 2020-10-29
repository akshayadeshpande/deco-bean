import * as React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from "react-native";

import Profile from "../components/Profile";
import { Text, View } from "../components/Themed";
import { db, auth } from "../App";
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';



/**
 * Renders the screen that holds all the user information for the logged in account
 * 
 * @param navigation: Takes a navigation object of what screens have occured beforehand
 *                  and allows future navigation from this screen 
 */
export default function ProfileScreen({navigation}) {
  const [user, setUser] = useState({}); //User
  const [loaded, setLoading] = useState(true); //if loading
  const colorScheme = useColorScheme(); //Colors of the app

  //gets information about the current user that is logged in and changes the state
  useFocusEffect(
    React.useCallback(() => {
      const getUser = firebase.functions().httpsCallable('getUser') //firebase call
      getUser({}).then((result) => {
          setUser(result.data.user);
          setLoading(false); //finished loading
      }).catch(function(err){
          console.log(err);
          alert('An internal error occured. Please try again later.')
      })
     },[])
  );
    
    //Render screen
    return (loaded ? 
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
      </View>
    :   
        <View style={styles.container}>
          <Profile navigation={navigation} user={user} touchFriends={true}/>
        </View>
      );
};

//Styling for screen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
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
