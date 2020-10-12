import { View, Text, StyleSheet } from "react-native";
import * as React from 'react';


export default function FriendsProfileScreen({route, navigation}) { 
    const {country,
        userName,
        email,
        forLang,
        friendCount,
        homeLang,
        name,
        signedUp,
        wordCount} = route.params;

    return(
    <View style={styles.container}>
        <View style={styles.ButtonView}><Text>{userName}</Text></View>
        <View style={styles.ButtonView}><Text>{country}</Text></View>
        <View style={styles.ButtonView}><Text>{name}</Text></View>
        <View style={styles.ButtonView}><Text>{email}</Text></View>
        <View style={styles.ButtonView}><Text>{homeLang}</Text></View>
        <View style={styles.ButtonView}><Text>{forLang}</Text></View>
        <View style={styles.ButtonView}><Text>{friendCount}</Text></View>
        <View style={styles.ButtonView}><Text>{signedUp}</Text></View>
        <View style={styles.ButtonView}><Text>{wordCount["Spanish"]}</Text></View>
        <View style={styles.ButtonView}><Text>{wordCount["Chinese"]}</Text></View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonView: {
      padding: 5,
    },
    CMContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    imgHolder: {
      padding: 20,
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
    },
    imageStyle:{
      width: 200, 
      height: 300,
      resizeMode: 'stretch'
     }
  });