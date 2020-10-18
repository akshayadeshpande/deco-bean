import * as React from 'react';
import { useState, useEffect, Component } from 'react';
import { StyleSheet, Button, ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import NavTouchButton from "../components/NavTouchButton";
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


export default function Profile({navigation, user}) {
    const [loaded, setLoading] = useState(true);
    const colorScheme = useColorScheme();
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
        // let user = user;
        console.log(user)
        // console.log(props.user);
        setUserName(user.userName);
        setName(user.name);
        setCountry(user.country);
        setEmail(user.email);
        setForLang(user.forLang);
        setHomeLang(user.homeLang);
        setFriendCount(user.friendCount);
        setWordCount(user.wordCount);
        setSignedUp(user.signedUp.split(" ").slice(0, 5).join(" "));
        setLoading(false);
        setForLangCount(user.wordCount[user.forLang]);
    },[]);

    return (loaded ? 
        <View style={styles.titleContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].activeTint} />
        </View>
    :   
        
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf: "center" }}>
                <View>
                    <MaterialIcons name={"account-circle"} color={"white"} size={200}/>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 36, }}>{name}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
                    <Text style={[styles.subText, { fontSize: 24 }]}>{forLangCount}</Text>
                    <Text style={styles.subText}>Words</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1}]}>
                    <Text style={[styles.subText, { fontSize: 24 }]} onPress={() => {navigation.navigate("FriendsScreen")}}>{friendCount}</Text>
                    <Text style={styles.subText}>Friends</Text>
                </View>
            </View>
            <View>
                <View style={[styles.profileItem]}>
                    <MaterialIcons name={"email"} size={iconSize} color={Colors[colorScheme].tint} />
                    <Text style={[styles.text]}>{email}</Text>
                </View>
                <View style={[styles.profileItem]}>
                    <MaterialIcons name={"home"} size={iconSize} color={Colors[colorScheme].tint} />
                    <Text style={[styles.text]}>{homeLang}</Text>
                </View>
                <View style={[styles.profileItem]}>
                    <MaterialIcons name={"translate"} size={iconSize} color={Colors[colorScheme].tint} />
                    <Text style={[styles.text]}>{forLang}</Text>
                </View>
                <View style={[styles.profileItem]}>
                    <MaterialIcons name={"room"} size={iconSize} color={Colors[colorScheme].tint} />
                    <Text style={[styles.text]}>{country}</Text>
                </View>
                <View style={[styles.profileItem]}>
                    <MaterialIcons name={"create"} size={iconSize} color={Colors[colorScheme].tint} />
                    <Text style={[styles.text]}>{signedUp}</Text>
                </View>
            </View>

        </ScrollView>
    </SafeAreaView>
    );
    //   <NavTouchButton screenName="ChangeEmail" text="Change Email" />

    //   {Platform.OS === "ios" ? 
    //   <View style={styles.appButtonContainer}>
    //   <Button title="Friends" 
    //   color={"#fff"}
    //   onPress={() => {navigation.navigate("FriendsScreen")}}
    //   />
    //   </View>
    // : 
    //   <Button title="Friends" 
    //   color={Colors[colorScheme].activeTint}
    //   onPress={() => {navigation.navigate("FriendsScreen")}}
    //   />
    //   }
    //   </View>
    //   </View>
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
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
        paddingBottom: 20,
        paddingTop: 10,
        fontSize: 28
    },
    imageStyle:{
      width: 200, 
      height: 300,
      resizeMode: 'stretch'
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