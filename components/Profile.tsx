import * as React from 'react';
import { useState, useEffect, Component, } from 'react';
import { StyleSheet, Button, ActivityIndicator, SafeAreaView, ScrollView, Image} from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import NavTouchButton from "../components/NavTouchButton";
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

/**
 * Component that renders information about a user 
 * 
 * @param navigation: The nav stack to be passed around
 * @param user: The user that will have their information rendered to the screen
 * @param touchFriends: Determines if the profile will render a touchable for the friends button
 *                      (This will allow for the main user to see their own friends but stop them
 *                       from seeing information about other peoples friends, reducing the amount
 *                       of personal information people can see about other people they don't know) 
 */
export default function Profile({navigation, user, touchFriends}) {
    const colorScheme = useColorScheme(); // App colors
    //States for the profile being loaded
    const [loaded, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [forLang, setForLang] = useState('');
    const [homeLang, setHomeLang] = useState('');
    const [friendCount, setFriendCount] = useState(0);
    const [wordCount, setWordCount] = useState({});
    const [signedUp, setSignedUp] = useState('');
    const iconSize = 40;
    const [forLangCount, setForLangCount] = useState(0);

    //Runs on the first launch to get all the needed information for the user
    useEffect(() => {
        setUserName(user.userName);
        setName(user.name);
        setCountry(user.country);
        setEmail(user.email);
        setForLang(user.forLang);
        setHomeLang(user.homeLang);
        setFriendCount(user.friendCount);
        setWordCount(user.wordCount);
        setSignedUp(user.signedUp.split(" ").slice(1, 4).join(" "));
        setForLangCount(user.wordCount[user.forLang]);
        setLoading(false);
    },[user]);

    //Renders profile information
    return (loaded ? 
        <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
        </View>
    :       
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf: "center", marginTop: 10}}>
                <View>
                    <Image source={require('../assets/images/profileMEMA.png')} style={{width:200, height:200}}/>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
                    <Text style={[styles.subText, { fontSize: 24 }]}>{forLangCount}</Text>
                    <Text style={styles.subText}>Words</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1}]}>
                    {touchFriends ? 
                    <Text style={[styles.subText, { fontSize: 24 }]} onPress={() => {navigation.navigate("FriendsScreen")}}>{friendCount}</Text>
                    :
                    <Text style={[styles.subText, { fontSize: 24 }]}>{friendCount}</Text>
                    }
                    
                    <Text style={styles.subText}>Friends</Text>
                </View>
            </View>
            <View>
                { email && 
                <View style={[styles.profileItem]}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
                        <MaterialIcons name={"email"} size={iconSize} color={Colors[colorScheme].tint} />
                        <Text style={{fontSize: 28, fontWeight: "bold", color: Colors[colorScheme].tint}}> Email ... </Text>
                    </View>
                    <Text style={[styles.text]}>{email}</Text>
                </View>
                }
                <View style={[styles.profileItem]}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
                        <MaterialIcons name={"home"} size={iconSize} color={Colors[colorScheme].tint} />
                        <Text style={{fontSize: 28, fontWeight: "bold", color: Colors[colorScheme].tint}}> Knows ... </Text>
                    </View>
                    <Text style={[styles.text]}>{homeLang}</Text>
                </View>
                <View style={[styles.profileItem]}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
                        <MaterialIcons name={"translate"} size={iconSize} color={Colors[colorScheme].tint} />
                        <Text style={{fontSize: 28, fontWeight: "bold", color: Colors[colorScheme].tint}}> Is learning ... </Text>
                    </View>
                    <Text style={[styles.text]}>{forLang}</Text>
                </View>
                { country && 
                <View style={[styles.profileItem]}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
                        <MaterialIcons name={"room"} size={iconSize} color={Colors[colorScheme].tint} />
                        <Text style={{fontSize: 28, fontWeight: "bold", color: Colors[colorScheme].tint}}> Is from ... </Text>
                    </View>
                    <Text style={[styles.text]}>{country}</Text>
                </View>
                }
                { signedUp && 
                <View style={[styles.profileItem]}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
                        <MaterialIcons name={"create"} size={iconSize} color={Colors[colorScheme].tint} />
                        <Text style={{fontSize: 28, fontWeight: "bold", color: Colors[colorScheme].tint}}> User since ... </Text>
                    </View>
                    <Text style={[styles.text]}>{signedUp}</Text>
                </View>
                }
            </View>

        </ScrollView>
    </SafeAreaView>
    );
}

//Component styling
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
    CMContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    text: {
        paddingBottom: 20,
        paddingTop: 10,
        fontSize: 28
    }, 
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 25,
        paddingRight: 10,
        paddingLeft: 10
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    profileItem: {
        alignSelf: "center",
        alignItems: "center",
    }
  });