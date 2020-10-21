import * as React from 'react';
import { Button, StyleSheet, Image, Platform } from 'react-native';
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
            {Platform.OS === "ios" ? 
            <View style={styles.appButtonContainer}>
            <Button title="Start Learning"
            color={"#fff"}
            onPress={() => navigation.navigate("SignUp")}/>
            </View>
            :
            <View style={styles.appButtonContainer}>
            <Button title="Start Learning"
            color={Colors[colorScheme].activeTint}
            onPress={() => navigation.navigate("SignUp")}
            />
            </View>
            }

            <View style={{padding:10}}>
                <Text>
                   or 
                </Text>
            </View>

            <View>
            {Platform.OS === "ios" ? 
                <View style={styles.appButtonContainer2}>
                    <Button title="Sign In"
                    color={"#fff"}
                    onPress={() => navigation.navigate("SignIn")}/>
                    </View>
                    :
                    <View style={styles.appButtonContainer2}>
                    <Button title="Sign In"
                    color={Colors[colorScheme].activeTint}
                    onPress={() => navigation.navigate("SignIn")}
                    />
                </View>
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: {
        padding: 20,
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