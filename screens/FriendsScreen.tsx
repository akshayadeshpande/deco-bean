import * as React from 'react';
import { Text, View, StyleSheet, SectionList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import * as firebase from 'firebase';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

var DBFriendsData;


import { useEffect, useState } from 'react';

const colorScheme = useColorScheme();
export default function FriendsScreen({navigation, props}) {
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
        wordCount:{"Spanish": 0, 
                    "Chinese": 0}
    }
    ]}]);

    useEffect(() => {
        const incomingFriends = firebase.functions().httpsCallable('getUserFriends')
        incomingFriends({}).then((result) => {
            console.log(result);
            DBFriendsData = result.data['friends'];
            assembleFriends(result.data['friends'], setFriendsList);
            setLoading(false);
        }).catch(function(err){
            console.log(err);
            alert('An internal error occured. Please try again later.')
        });
      }, []);

    return (loaded ? 
      <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
      </View>
       :  
        <SectionList
      sections={friendsList}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => 
                navigation.navigate("FriendsProfileScreen", {
                    country: item.country,
                    userName: item.userName,
                    email: item.email,
                    forLang: item.forLang,
                    friendCount: item.friendCount,
                    homeLang: item.homeLang,
                    name: item.name,
                    signedUp: item.signedUp,
                    wordCount:{"Spanish": item.wordCount["Spanish"], 
                                "Chinese": item.wordCount["Chinese"]}
                }
                )}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.userName}</Text>
              </View>
              <View style={styles.listArrow}>
                <FontAwesome name="chevron-right" size={16} color="black" />
              </View>
            </View>
          </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item.userName} //Unique words only
    />
      ); 
}

function assembleFriends(friendsData, setFriendsList) {
    let friendsList = [{title: friendsData['userName'], data: []}]

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

    setFriendsList(friendsList);

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
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 30,
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
    listArrow: {
      padding: 10,
      justifyContent: "center",
    }
  });