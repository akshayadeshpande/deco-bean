import * as React from 'react';
import { Button, StyleSheet, Image, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function StartLearningScreen({navigation}) {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.viewStyle}>
            <View style={styles.imageWrap}>
            <Image source={require("../assets/images/MEMALOGO2.png")} style={styles.imageView}/>
            </View>
            {Platform.OS === "ios" ? 
            <View style={styles.appButtonContainer}>
            <Button title="Start Learning"
            color={"#fff"}
            onPress={() => navigation.navigate("SignIn")}/>
            </View>
            :
            <View style={styles.appButtonContainer}>
            <Button title="Start Learning"
            color={Colors[colorScheme].activeTint}
            onPress={() => navigation.navigate("SignIn")}
            />
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageView: {
        width: 200, 
        height: 200,
    },
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FF9E1C",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 40
      }
});