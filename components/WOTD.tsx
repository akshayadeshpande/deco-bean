import * as React from 'react';
import { StyleSheet, Image, } from 'react-native';
import { Text, View } from '../components/Themed';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

/* Word of the Day Component. 
 *
 * Component shows the current word of the data, this component lives on the Home Screen.
 * 
 * @props Information from the screen that is rending the component.
 * @returns Render for the Word of the Day Component.
 */
function WordOfTheday(props) {
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <View style={{flex:1, flexDirection:"row", elevation:0.3, right:100}}>
        <Image source={require('../assets/images/MEMA2.png')} style={{position:'relative', bottom: 55, width:75, height:75, resizeMode:"stretch"}}/>
        <View style={{position:'relative'}}>
          <Text style={{flex:1, position:"absolute",bottom:5, fontWeight:"bold", elevation:0.3}}>MEMA'S WORD OF THE DAY</Text>
        </View>
      </View>
    <View style={styles.container}>
      <View style={{ flex: 1,  paddingHorizontal:10, flexDirection: 'row', justifyContent:"center", alignItems:"center", backgroundColor: "#FF9E1C"}}>
        <View style={{flex: 1,  backgroundColor: "#FF9E1C", alignItems:"center",justifyContent:"center"}}>
          <Text style={styles.LeftWord}>{props.word.homeLangWord}</Text>
        </View>
        <View style={{paddingVertical:40, backgroundColor: "#FF9E1C", position: "relative" , borderStartWidth: 1.5 ,borderColor:"#fff", borderWidth:1, alignItems: "center", justifyContent: "center"}}/>
        <View  style={{ flex: 1,  backgroundColor: "#FF9E1C", alignItems:"center",justifyContent:"center"}}>
          <Text style={styles.RightTranslation} > {props.word.forLangWord} </Text>
        </View>
      </View>
    </View>
    </View>
  )
}


/* STYLES */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#FF9E1C",
      borderRadius: 20,
      paddingVertical: 50,
      paddingHorizontal: 5,
    },
    title: {
      fontSize: 10,
      fontWeight: 'bold',
    },
    RightTranslation: {
      fontSize: 20,
      fontWeight: "bold",
      backgroundColor: "#FF9E1C",
      flex: 1,
      position:"absolute",
      justifyContent:"center",
      alignItems: "center",
    },
    LeftWord: {
      fontSize: 20,
      backgroundColor: "#FF9E1C",
      fontWeight: "bold",
      elevation:0.3,
      flex: 1,
      position:"absolute",
      justifyContent:"center",
      alignItems: "center",
    }
  });

export { WordOfTheday as default}
