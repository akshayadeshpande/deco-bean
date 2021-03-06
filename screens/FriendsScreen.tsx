import * as React from 'react';
import { StyleSheet, SectionList, TouchableOpacity, ActivityIndicator, Image , Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import * as firebase from 'firebase';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

/**
 * Renders all the friends of the current user in a list format.
 * 
 * Allows:
 * - Viewing of other friends profiles
 * - Removing of friends
 * 
 * @param navigation: The nav stack being passed around, allowing navigation between screens 
 */
export default function FriendsScreen({navigation}) {
    const colorScheme = useColorScheme(); //App colors
    //States of the page
    const [loaded, setLoading] = useState(true); //If the screen if loading information
    const [friendsList, setFriendsList] = useState([]);  //Friends of the user
    

    //Loads only once, getting information about all the current users friends.
    useEffect(() => {
        const incomingFriends = firebase.functions().httpsCallable('getUserFriends')
        incomingFriends({}).then((result) => {
            setFriendsList(result.data.friends);
            setLoading(false);
        }).catch(function(err){
            console.log(err);
            alert('An internal error occured. Please try again later.')
        });
      }, []);
      
    //Renders the list of all the users friends
    return (loaded ? 
      <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
      </View>
       :  
       <View style={[styles.back]}>
         {
           friendsList.length == 0 ? 
            <View style={styles.imgGap}>
              <Image source={require('../assets/images/MEMA.png')} style={styles.mema}/>
              <Text style={styles.addFriendsText}>Press + to start adding your friends!</Text>
            </View>
           :
           <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <FlatList
                  data={friendsList}
                  renderItem={({item}) => (
                
                  <TouchableOpacity>                
                    <View style={styles.listItemContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('../assets/images/profileMEMA.png')} style={{width:50, height:50, margin: 5}}/>
                            <Text style={[styles.listText, {fontSize: 20}]}>{item.userName}</Text>
                        </View>
                        <View style={styles.listArrow}>
                            <Button color={Colors[colorScheme].activeTint} onPress={() => removeFriend(item.id, navigation, setLoading)} title={"Unfriend"}/>
                            <View style={{width: 2}}></View>
                            <Button color={Colors[colorScheme].activeTint} onPress={() => navigation.navigate("FriendsProfileScreen", {user: item})} title={"View"}/>
                            <View style={{width: 2}}></View>
                        </View>
                    </View>
                </TouchableOpacity>
                  
                )} keyExtractor={(item, index) => item.id} //Unique words only     
                /> 
              </View>
            </View>
          }     
            <TouchableOpacity style={[styles.fab, {backgroundColor: Colors[colorScheme].tint}]} onPress={() => navigation.navigate('FriendsSearchScreen')}>
              <Text style={{color: Colors[colorScheme].background, fontSize: 30, marginBottom: 5}}>+</Text>
            </TouchableOpacity>       
       </View>
      ); 
}

/**
 * Removes a friend from the current user's friends list.
 * 
 * @param uid id of the friend that the user wants to remove
 * @param navigation the navigation object for the screen
 * @param setLoading screen state function for if the screen should be loading
 */
function removeFriend(uid, navigation, setLoading){
  let removeFriend = firebase.functions().httpsCallable('removeUserFriends')
  setLoading(true);
  removeFriend({friends: [uid]}).then((res) => {
      navigation.navigate('ProfileScreen', {initial: false});
}).catch((err) => {
    console.log(err);
  })
}


//Styling for the page
const styles = StyleSheet.create({
    sectionHeader: {
      padding: 10,
      marginBottom: 2,
      backgroundColor: 'rgba(44, 130, 201, 1)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,
      elevation: 10,
    },
    back: {
      backgroundColor: "#177AC1",
      flex: 1,
    }, 
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 30,
    },
    mema: {
      width: 200,
      height: 200,
    },
    listItemContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: 'rgba(241, 130, 141,1)',
      borderBottomWidth: 2,
      marginBottom: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,
      elevation: 2,
      alignItems: "center"
    },
    listItem: {
      padding: 10,
    },
    listText: {
      fontSize: 20,
    },
    imgGap: {
      padding: 50,
      alignItems:"center",
      justifyContent: "center"
    },
    listArrow: {
      flexDirection: "row",
      justifyContent: "center",
    },
    fab: {
      width: 60,
      height: 60,
      position: "absolute",
      bottom: 20,
      right: 20,
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    addFriendsText: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: "center"
    }
  });