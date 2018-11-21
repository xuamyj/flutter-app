import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';

import firebase from 'firebase';

import Fire from '../Fire';

class Settings extends React.Component {
  state = {
    userName: 'Amy',
    userPicUrl: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
    inputName: '',
    inputPicUrl: '',
    errorMsg: 'Error message placeholder',
  }

  onChangeInputName = (inputName) => {this.setState({ inputName: inputName })}

  onPressUpdateProfile = () => {
    // TODO backend
    console.log(this.state.inputName);
    console.log(this.state.inputPicUrl);
  }

  onSignout = () => {
    // amy side note: ahh, javascript without arrows... i missed you!
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      // don't need to do anything because firebase.auth().onAuthStateChanged() in AuthLoading.js
    }).catch(function(error) {
      // TODO toast
    })
  }

  onPressCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      {this.setState({ inputPicUrl: result.uri })}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          medium
          rounded
          source={{uri: this.state.userPicUrl}}
          activeOpacity={0.7}
        />
        <Text>
          {this.state.userName}
        </Text>

        <FormLabel>Display name</FormLabel>
        <FormInput onChangeText={this.onChangeInputName}/>
        <FormValidationMessage>{this.state.errorMsg}</FormValidationMessage>

        <FormLabel>Picture</FormLabel>
        <Button
          title="Upload Photo"
          color="#49B6BB"
          onPress={this.onPressCamera}
        />
        <Image
          style={styles.imagePreview}
          source={{uri: this.state.inputPicUrl}}
        />

        <Button
          title="Update profile"
          color="#49B6BB"
          onPress={this.onPressUpdateProfile}
        />

        <Button
          title="Logout"
          color="#49B6BB"
          onPress={this.onSignout}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    width: 80,
    height: 80,
  },
})

export default Settings;
