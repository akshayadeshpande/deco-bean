import * as React from "react";
import { StyleSheet } from "react-native";

import Profile from "../components/Profile";
import { Text, View } from "../components/Themed";
import { db, auth } from "../App";
import * as firebase from "firebase";
import { useScreens } from "react-native-screens";
import { Button } from "react-native";
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


export default function ProfileScreen({navigation, props}) {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
          <Profile/>
          <Button title="Friends" 
          color={Colors[colorScheme].activeTint}
          onPress={() => {navigation.navigate("FriendsScreen")}}
          />
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
