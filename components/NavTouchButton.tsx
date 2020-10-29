import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from '../components/Themed';

/**
 * Renders a component that can use the nav on a screen
 * 
 * @param props Information from the screen that is rending component
 */
export default function NavTouchButton(props) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  //Renders the component
  return (
    <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate(props.screenName)}>
        <View style={{alignItems:"center"}}>
          <Image source={props.iconName} style={styles.iconButton}/>
        </View>
        <View>
          <Text style={styles.text}>{props.text}</Text>
        </View>

    </TouchableOpacity>
  );
}

//Component styling
const styles = StyleSheet.create({
  button: {
    flex:1, 
    flexDirection:"column",
    padding: 10,
  },
  iconButton: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
