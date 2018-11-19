import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';

import Fire from '../Fire';

class Settings extends React.Component {

  state = { displayName: '', profilePic: '', displayNameInput: '', errorMessage: null }

  onPress = () => {
    Fire.shared.updateUserDisplayName(Fire.shared.uid, this.state.displayNameInput, () => {
      console.log("TOAST GOES HERE");
    }, () => {
      console.log("ERROR GOES HERE");
    })
  }

  onChangeText = displayNameInput => this.setState({ displayNameInput });

  render() {
    return (
      <View>
        <Text>Settings!</Text>
        <Text>{this.state.displayName}</Text>

        <Text style={styles.title}>Display name:</Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeHolder="Higgs"
          value={this.state.displayNameInput}
        />
        <Text style={styles.title}>Set a new profile picture:</Text>

        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Update profile</Text>
        </TouchableOpacity>

        <Button
          title="Logout"
          onPress={
            () => firebase.auth().signOut().then(function() {
              // Sign-out successful.
              // don't need to do anything because firebase.auth().onAuthStateChanged() in AuthLoading.js
            }).catch(function(error) {
              return this.setState({ errorMessage: error.message });
            })
            // amy side note: ahh, javascript without arrows... i missed you!
          }
        />
      </View>
    );
  }

  componentDidMount() {
    Fire.shared.getUserDisplayName(Fire.shared.uid, result => {
      this.setState(previousState => ({
        displayName: result
      }))
    })
  }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
})

export default Settings;
