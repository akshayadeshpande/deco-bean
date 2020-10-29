import * as React from 'react';
import { StyleSheet, Button, ScrollView, Platform, Image } from 'react-native';
import { useState, useEffect, Component } from 'react';
import { Text, View } from './Themed';
import * as firebase from 'firebase';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { MemaBText } from '../components/StyledText';

/**
 * Default render function that will display this screen in the app
 * Gives the user the ability to register for a Mema account.
 * 
 * Allows for:
 * - Adding of an email
 * - Adding of the user's name
 * - Adding what language they want to learn
 * - Adding of a user's password for their new account
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */
export default function Register({navigation}) {
    const colorScheme = useColorScheme(); //Gets the app color scheme
    const [name, setName] = useState(''); //User's name
    const [email, setEmail] = useState(''); //User's email
    const [password, setPassword] = useState(''); //User's password
    const [homeLang, setHomeLang] = useState('English'); //Default language that the app will be in
    const [forLang, setForLang] = useState(''); //Language that user wants to learn
    const [pickingLang, setPicking] = useState(false); //Determines if the language picking screen needs to be picked

    if (!pickingLang) { //Renders the text input to sign up for an account
      return (
        <ScrollView style={{flex:1, alignContent:"center"}}>
          
            <Text style={styles.text}>Name</Text>
            <TextInput 
              placeholder="Your Name" 
              onChangeText={(t) => setName(t)}
              value={name}
              style={styles.textInput}/>
            <Text style={styles.text}>Email</Text>
            <TextInput 
              placeholder="Your Email" 
              onChangeText={(t) => setEmail(t.trim())}
              value={email}
              style={styles.textInput}/>
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={(t) => setPassword(t.trim())}
              value={password}
              style={styles.textInput}/>
            <View style={{padding:40}}/>
            
            {Platform.OS === "ios" ? 
            <View style={styles.Register}>
              <Button title="Next" 
              color={"#fff"}
              onPress={() => setPicking(true)}
              />
            </View>
            :
            <Button title="Next" 
            color={Colors[colorScheme].activeTint}
            onPress={() => setPicking(true)}
            />
            }
        
      </ScrollView>
      );

    } else { //Gives the buttons for what language is wanted to be learnt
      return (
        <ScrollView style={{flex:1}}>
          
            <View style={styles.buttonWrapper}>
              <Text>I want to learn...</Text>
            </View>
          
            <View style={styles.buttonWrapper}>
            { forLang === "Chinese" ?
            <View style={styles.buttonContainer}>
              <Image source={require('../assets/images/Chinese.png')} style={styles.icon}/>
              
                <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {setForLang("Chinese")}}>
                  <Text>Chinese</Text>
                </TouchableOpacity>
              
            </View>
            :
            <View style={styles.buttonContainer}>
              <Image source={require('../assets/images/Chinese.png')} style={styles.icon}/>
              
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setForLang("Chinese")}}>
                  <Text>Chinese</Text>
                </TouchableOpacity>
              
            </View>
            }
            </View>
  
            <View style={styles.buttonWrapper}>
            { forLang === "Spanish" ?
            <View style={styles.buttonContainer}>
              <Image source={require('../assets/images/Spanish.png')} style={styles.icon}/>
              
                <TouchableOpacity style={styles.appButtonContainer2} onPress={() => {setForLang("Spanish")}}>
                  <Text>Spanish</Text>
                </TouchableOpacity>
              
            </View>
            :
            <View style={styles.buttonContainer}>
              <Image source={require('../assets/images/Spanish.png')} style={styles.icon}/>
              
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setForLang("Spanish")}}>
                  <Text>Spanish</Text>
                </TouchableOpacity>
              
            </View>
            }
            </View>
            
            <View style={{padding:30}}>
              <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.appButtonContainer} onPress={() => {setPicking(false)}}>
                    <MemaBText>Back</MemaBText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            
            {Platform.OS === "ios" ? 
            
            <View style={styles.Register}>
              <Button title="Register" 
              color={"#fff"}
              onPress={event => registerUser(event, name, email, password, forLang, homeLang)}
              />
            </View>
            :
            
            <Button title="Register" 
            color={Colors[colorScheme].activeTint}
            onPress={event => registerUser(event, name, email, password, forLang, homeLang)}
            />
            }
          
        </ScrollView>
      );
    }
    
}

/**
 * Gives information about the user from the client side to firebase
 * 
 * @param event react native event trigger
 * @param name new user's sign up name
 * @param email new user's sign up email
 * @param password new user's sign up password
 * @param forLang new user's sign up language they want to learn
 * @param homeLang native language of the new user
 */
async function registerUser(event, name, email, password, forLang, homeLang){
  const auth = firebase.auth(); //creates firebase user session
  const db = firebase.firestore(); //connects to firebase firestore
  const usersCollection = "users"; //sets the string for the user collection
  event.preventDefault(); //stops default event

  //User sign up from firebase api
  auth.createUserWithEmailAndPassword(email, password).then(function(data){
    var user = auth.currentUser;
    if (user != null){
      user.updateProfile({
        displayName: name
      }).then(function() {
          // console.log(user);
      });  
      const userData = {
        country: 'Australia',
        email: user.email,
        forLang: forLang,
        homeLang: homeLang, 
        name: name,
        userName: name,
        signedUp: firebase.firestore.Timestamp.now(),
        friends: [],
        seen: {}
      }
      const rest = db.collection(usersCollection).doc(user.uid).set(userData);
    } else {
      alert("Internal error please try again later");
    }
    alert("Account created successfully, enjoy MeMa"); 
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode);
    alert(errorMessage);
  });
} 

//Styling for the component
const styles = StyleSheet.create({
    textInput: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      backgroundColor: "#fff",
      padding: 10,
      paddingHorizontal: 50,
      color: "#177AC1"
    },
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
    Register: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 50,
      justifyContent: "center",
      alignItems: "center",
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
      padding: 5,
    },
    imageStyle:{
      width: 200, 
      height: 300, 
      resizeMode: 'center'
     },
     buttonContainer: {
       flex:1, 
       flexDirection: 'row',
       alignItems: "stretch"
     },
     buttonWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
     },
     icon: {
      width: 60, 
      height: 60,
    },
     appButtonContainer: {
      elevation: 8,
      backgroundColor: "#FF9E1C",
      borderRadius: 40,
      paddingVertical: 20,
      paddingHorizontal: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    appButtonContainer2: {
      elevation: 8,
      backgroundColor: "#FCEB97",
      borderRadius: 40,
      paddingVertical: 20,
      paddingHorizontal: 80,
      justifyContent: "center",
      alignItems: "center",
    }
  });