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
        <h1>Uppline Students</h1>
        {this.state.users &&
          this.state.users.map((users) => {
            return (
              <div>
                <p>
                  {users.name}-{users.country}
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}
export default App;
