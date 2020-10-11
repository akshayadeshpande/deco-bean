import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { getDailyWord, WordDisplay } from "../components/WOTD";
import NavTouchButton from "../components/NavTouchButton";
import * as firebase from "firebase";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <WordDisplay word={getDailyWord()} />
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton
            screenName="Profile"
            text="My Profile"
            iconName="user"
          />
        </View>
        <View style={styles.navBox}>
          <NavTouchButton
            screenName="Dictionary"
            text="My Words"
            iconName="book"
          />
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.navBox}>
          <NavTouchButton
            screenName="Challenge"
            text="Challenge Mode"
            iconName="gamepad"
          />
        </View>
        <View style={styles.navBox}>
          <NavTouchButton
            screenName="MeMa"
            text="Talk to MeMa"
            iconName="comments-o"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerRow: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    padding: 20,
  },
});
