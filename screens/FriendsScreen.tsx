import { Text, View, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import * as firebase from 'firebase';

import { useEffect, useState } from 'react';


export default function FriendsScreen({navigation, props}) {
    const [friendsList, setFriendsList] = useState(
        [{title: 'category', data: [{friend: 'friend'}]}]
      );

    useEffect(() => {
        getFriends();
      }, []);

    return (
    <SectionList
      sections={friendsList}
      renderSectionHeader={({section}) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>{section.title} Dictionary</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("FriendsProfileScreen")}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.friend}</Text>
              </View>
              <View style={styles.listArrow}>
                <FontAwesome name="chevron-right" size={16} color="black" />
              </View>
            </View>
          </TouchableOpacity>
      )}
      
      keyExtractor={(item, index) => item.friend} //Unique words only
    />
    );
}

async function getFriends() {
    var friends = [];

    var incomingFriends = firebase.functions().httpsCallable('getUserFriends')
    incomingFriends({}).then((result) => {
        var friendsList = result.data['friends'];
        console.log(friendsList);
    })

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