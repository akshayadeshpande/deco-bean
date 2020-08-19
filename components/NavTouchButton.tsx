import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavTouchButton({ screenName, text, iconName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(screenName)}>
      <Text style={styles.text}>{text}</Text>
      <FontAwesome name={iconName} size={32} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
