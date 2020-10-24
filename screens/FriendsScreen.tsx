import * as React from 'react';
import { StyleSheet, SectionList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import * as firebase from 'firebase';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import { useEffect, useState } from 'react';

/**
 * Renders all the friends of the current user in a touchable list
 * 
 * @param navigation: The nav stack being passed around, allowing navigation between screens 
 */
export default function FriendsScreen({navigation}) {
    const colorScheme = useColorScheme(); //App colors
    //States of the page
    const [loaded, setLoading] = useState(true);
    const [friendsList, setFriendsList] = useState([{title: "Loading...", 
    data : [{
        userName: 'Loading...',
        country: "",
        email: "",
        forLang: "",
        friendCount: 0,
        homeLang: "",
        name: "",
        signedUp: "",
        wordCount:{}
    }
    ]}]);

    //Loads only once, getting information about all the current users friends.
    useEffect(() => {
        const incomingFriends = firebase.functions().httpsCallable('getUserFriends')
        incomingFriends({}).then((result) => {
            assembleFriends(result.data['friends'], setFriendsList);
            setLoading(false);
        }).catch(function(err){
            console.log(err);
            alert('An internal error occured. Please try again later.')
        });
      }, []);
      
    //Renders the touchable list of all the users friends
    return (loaded ? 
      <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
      </View>
       :  
       <View style={styles.back}>
         {
           friendsList[0].data.length == 0 ? 
            <View style={styles.imgGap}>
              <Image source={require('../assets/images/MEMA.png')} style={styles.mema}/>
              <Text style={styles.addFriendsText}>Press + to start adding your friends!</Text>
            </View>
           :
           <View>
              <SectionList
                sections={friendsList}
                stickySectionHeadersEnabled={true}
                renderItem={({item}) => (
              
                <TouchableOpacity
                  onPress={() => 
                      navigation.navigate("FriendsProfileScreen", {user: item})}>
            
                  <View style={styles.listItemContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Image source={require('../assets/images/profileMEMA.png')} style={{width:50, height:50, margin: 5}}/>
                        <Text style={[styles.listText, {fontSize: 20}]}>{item.userName}</Text>
                    </View>
                    <View style={styles.listArrow}>
                      <FontAwesome name="chevron-right" size={16} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>
                
              )} keyExtractor={(item, index) => item.userName} //Unique words only     
              /> 
            </View>
          }     
            <TouchableOpacity style={[styles.fab, {backgroundColor: Colors[colorScheme].tint}]} onPress={() => navigation.navigate('FriendsSearchScreen')}>
              <Text style={{color: Colors[colorScheme].background, fontSize: 30, marginBottom: 5}}>+</Text>
            </TouchableOpacity>       
       </View>
      ); 
}

/**
 * Assembles the information about a user's friend in a way that can be rendered
 * 
 * @param friendsData: Information about the the user's friend
 * @param setFriendsList: State change function that will hold the data about friends
 */
function assembleFriends(friendsData, setFriendsList) {
    let friendsList = [{title: friendsData['userName'], data: []}]

    //Iterate through all user friends
    friendsData.forEach((friendDoc) => {
        switch(friendsData['userName']) {
            default:
                friendsList[0].data.push({
                    "country": friendDoc['country'],
                    "email": friendDoc['email'],
                    "forLang": friendDoc['forLang'],
                    "friendCount": friendDoc['friendCount'],
                    "homeLang": friendDoc['homeLang'],
                    "name": friendDoc['name'],
                    "signedUp": friendDoc['signedUp'],
                    "userName": friendDoc['userName'],
                    "wordCount":{"Spanish": friendDoc['wordCount']['Spanish'], 
                                "Chinese": friendDoc['wordCount']['Chinese']}
                });
        }
    })
    setFriendsList(friendsList); //Changes state of screen
}


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
      padding: 10,
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