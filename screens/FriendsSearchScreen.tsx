import * as React from 'react';
import { StyleSheet, Image, TextInput, ActivityIndicator, SectionList, Button, Platform } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Default render function that will display this screen in the app
 * Allows for the user to see current friends and add new ones.
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */
export default function FriendSearchScreen({navigation}) {
  const colorScheme = useColorScheme(); //Allows app color scheme
  const [isFetching, setIsFetching] = useState(false); //Monitors the loading of friends
  const [query, setQuery] = useState(''); //Query Data
  const [searchResults, setSearchResults] = useState([]); //Search Result state

  //Renders the screen
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
        <View style={{flexDirection: "row"}}>
            <TextInput style={[styles.searchBar, {backgroundColor: Colors[colorScheme].bottomTabBackground, color:"#FF9E1C"}]}
                onChangeText={text => setQuery(text)}/>
            <TouchableOpacity style={styles.button} onPress={() => searchFriends(query, setSearchResults, setIsFetching, searchResults)}>
                <FontAwesome name="search" size={40} color={Colors[colorScheme].activeTint} style={{marginRight: 5}} />
            </TouchableOpacity>       
        </View>
        { isFetching ? 
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
        </View>
        : 
        <View style={{flex: 1, flexDirection: "row", flexGrow: 1}}>
            {   
                searchResults.length > 0 ? 
                <View style={[styles.container]}>
                    <FlatList
                    data={searchResults}
                    renderItem={({item}) => (
                              
                        <View style={styles.listItemContainer}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Image source={require('../assets/images/profileMEMA.png')} style={{width:50, height:50, margin: 5}}/>
                                <Text style={[styles.listText, {fontSize: 20}]}>{item.userName}</Text>
                            </View>
                            <View style={styles.listArrow}>
                              <Button color={Colors[colorScheme].activeTint} onPress={() => addFriend(item.id, navigation, setIsFetching)} title={"Add Friend"}/>
                              <View style={{width: 2}}></View>
                              <Button color={Colors[colorScheme].activeTint} onPress={() => navigation.navigate("FriendsProfileScreen", {user: item})} title={"View"}/>
                              <View style={{width: 2}}></View>
                            </View>
                        </View>
                    
                    )} keyExtractor={(item, index) => item.id} //Unique words only     
                    /> 
              </View> : <View></View>
            }
        </View>
        }
        
    </View>
  );
}

/**
 * Searches for a user that the current user is friends with.
 * 
 * @param query Who is being fount
 * @param setFriends state function for the screen
 * @param isFetching state function for the screen
 * @param friends Friends on the account
 */
function searchFriends(query, setFriends, isFetching, friends) {
    isFetching(true);
    let searchUsers = firebase.functions().httpsCallable('searchUsers')
    searchUsers({name: query}).then((res) => {
        isFetching(false);
        setFriends(res.data.users);
  }).catch((err) => {
      console.log(err);
    })
}

/**
 * Friends a new friend for the current user
 * 
 * @param uid the id of the friend that the current user wants to add
 * @param navigation screens navigation object
 * @param isFetching screen state function
 */
function addFriend(uid, navigation, isFetching){
    isFetching(true);
    let addFriend = firebase.functions().httpsCallable('addUserFriends')
    addFriend({friends: [uid]}).then((res) => {
        isFetching(false);
        navigation.navigate('ProfileScreen', {initial: false});
  }).catch((err) => {
      console.log(err);
    })
}

//Styling for the screen
const styles = StyleSheet.create({
  imgWrap: {
    width:150,
    height:150,
    resizeMode: "stretch",
  },
  mema: {
    width: 300,
    height: 300,
  },
  imgGap: {
    padding: 50,
    alignItems:"center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
  button: {
    alignItems: 'center',
    margin: 10,
  },
  searchBar: {
    flex:1,
    fontSize: 24,
    margin: 10,
    height: 40,
    width: "100%",
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: 'rgba(241, 130, 141,1)',
    borderBottomWidth: 2,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 2,
    alignItems: 'center'
  },
  listItem: {
    padding: 10,
  },
  listText: {
    fontSize: 20,
  },
  listArrow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
