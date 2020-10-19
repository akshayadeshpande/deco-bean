import { StyleSheet } from "react-native";
import * as React from 'react';
import { View, Text } from '../components/Themed';
import Profile from '../components/Profile'


export default function FriendsProfileScreen({route, navigation}) { 
    const {user} = route.params;

    return(
    <View style={styles.container}>
        <Profile navigation={navigation} user={user} touchFriends={false}/>
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