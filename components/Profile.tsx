import * as React from 'react';
import { useState, useEffect, Component } from 'react';
import { StyleSheet, Button} from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import NavTouchButton from "../components/NavTouchButton";
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';


var count = 0;

export default function Profile(props) {
    
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [forLang, setForLang] = useState('');
    const [homeLang, setHomeLang] = useState('');
    const [friendCount, setFriendCount] = useState(0);
    const [wordCount, setWordCount] = useState({});
    const [signedUp, setSignedUp] = useState('');

    //Runs on the first launch to get all the needed information for the user
    useEffect(() => {
        const getUser = firebase.functions().httpsCallable('getUser')
        getUser({}).then((result) => {
            let user = result.data.user;
            console.log(user);
            setUserName(user.userName);
            setName(user.name);
            setCountry(user.country);
            setEmail(user.email);
            setForLang(user.forLang);
            setHomeLang(user.homeLang);
            setFriendCount(user.friendCount);
            setWordCount(user.wordCount);
            setSignedUp(user.signedUp);
        }).catch(function(err){
            console.log(err);
            alert('An internal error occured. Please try again later.')
        })
    }, []);

    return (
      <View style={styles.CMContainer}> 
        <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.text}>Country : {country}</Text>
        <Text style={styles.text}>Email : {email}</Text>
        <Text style={styles.text}>Want to Learn : {forLang}</Text>
        <NavTouchButton screenName="ChangeEmail" text="Change Email" /> 
        
      </View>
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
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