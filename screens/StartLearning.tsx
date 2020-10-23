import * as React from 'react';
import { Button, StyleSheet, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function StartLearningScreen({navigation}) {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.viewStyle}>
            
            <Image source={require("../assets/images/MEMALOGO.png")} style={styles.imageView}/>
            
            <View style={{padding: 10}}>
                <Text>
                    New User?
                </Text>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.appButtonContainer}>
                <Text style={styles.textColor}>Start Learning</Text>
            </TouchableOpacity>
            

            <View style={{padding:10}}>
                <Text>
                   or 
                </Text>
            </View>

            <View>
            
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.appButtonContainer2}>
                    <Text style={styles.textColor}>Sign In</Text>
                </TouchableOpacity>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: {
        padding: 20,
    },
    textColor: {
        color:"#fff",
        alignItems:"center",
    },
    imageView: {
        resizeMode: 'stretch',
        width: 400, 
        height: 150,
    },
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appButtonContainer2: {
        elevation: 8,
        backgroundColor: "#FF9E1C",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 40
      },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FF9E1C",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 40
      }
});