import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { db, auth } from "../App";
import * as firebase from "firebase";
import { useScreens } from "react-native-screens";

class App extends React.Component {
  state = {
    users: null,
  };
  componentDidMount() {
    console.log("mounted");
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({ users: users });
        //console.log(snapshot);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <h1>Profile</h1>
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
              </View>
            );
          })}
      </div>
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
