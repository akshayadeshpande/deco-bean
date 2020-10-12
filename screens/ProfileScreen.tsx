import * as React from "react";
import { Button, StyleSheet } from "react-native";
import ChangeEmail from "./ChangeEmail";
import EditScreenInfo from "../components/EditScreenInfo";
import NavTouchButton from "../components/NavTouchButton";
import Navigation from "../navigation";
import { Text, View } from "../components/Themed";
import { db, auth } from "../App";
import * as firebase from "firebase";
import { useScreens } from "react-native-screens";

class App extends React.Component {
  state = {
    users: null,
  };
  componentDidMount() {
    var docRef = db.collection("users");
    docRef
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          {
            const data = doc.data();
            if (data.name == "regi00") {
              users.push(data);
            }
          }
        });
        this.setState({ users: users });
        //console.log(snapshot);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Profile</Text>
        {this.state.users &&
          this.state.users.map((users) => {
            return (
              <View style={styles.container}>
                <Text style={styles.title}>{users.name}</Text>
                <View
                  style={styles.separator}
                  lightColor="#eee"
                  darkColor="rgba(255,255,255,0.1)"
                />
                <Text style={styles.text}>Country : {users.country}</Text>
                <Text style={styles.text}>Email : {users.email}</Text>
                <Text style={styles.text}>Want to Learn : {users.forLang}</Text>
                <NavTouchButton screenName="ChangeEmail" text="Change Email" />
              </View>
            );
          })}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
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
