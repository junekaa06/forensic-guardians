import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as Google from "expo-google-app-auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "taken out bcuz not good to share",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log(result.user);
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch ( e ) {
      console.log("error", e)
    }
  };

  signOut = async () => {
    Alert.alert("Success", "Logged Out");
    this.setState({signedIn:false, photoUrl:'', name:""})
  };

  render(){
    return (
        <View style={styles.container}>
          {(this.state.signedIn) ?
              (<View>
                <Text>Welcome {this.state.name}</Text>
                <Image source={{uri: this.state.photoUrl}} style={{height: 150, width:150, borderRadius: 150/2}}/>
                <Button title={"Log Out"} onPress={this.signOut}/>
              </View>)
              :
              (<View>
                <Text>Sign In With Google</Text>
                <Button onPress={this.signIn} title="SIGN IN WITH GOOGLE"/>
              </View>)
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});