import * as React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from "react-native";

import Profile from "../components/Profile";
import { Text, View } from "../components/Themed";
import { db, auth } from "../App";
import * as firebase from "firebase";
import { useScreens } from "react-native-screens";
import { Button } from "react-native";
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


export default function ProfileScreen({navigation, props}) {

  const [user, setUser] = useState({});
  const [loaded, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
        const getUser = firebase.functions().httpsCallable('getUser')
        getUser({}).then((result) => {
            setUser(result.data.user);
            setLoading(false);
        }).catch(function(err){
            console.log(err);
            alert('An internal error occured. Please try again later.')
        })
    },[]);
    
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
