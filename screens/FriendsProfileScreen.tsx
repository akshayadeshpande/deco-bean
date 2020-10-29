import { StyleSheet } from "react-native";
import * as React from 'react';
import { View, Text } from '../components/Themed';
import Profile from '../components/Profile'

/**
 * Renders the profile of the current user's friend
 * 
 * @param route: Information that is being passed from the previous screen on the nav stack
 * @param navigation: The nav stack that is being passed around 
 */
export default function FriendsProfileScreen({route, navigation}) { 
    const {user} = route.params;

    //Renders the profile component with all the information about a user
    return(
    <View style={styles.container}>
        <Profile navigation={navigation} user={user} touchFriends={false}/>
    </View>
    );
}

//Styling for the page
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });