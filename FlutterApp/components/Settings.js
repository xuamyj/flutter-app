import React from 'react';
import { Text, View, Button } from 'react-native';

class Settings extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
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
}

export default Settings;
