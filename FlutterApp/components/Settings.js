import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';

import firebase from 'firebase';

import Fire from '../Fire';

class Settings extends React.Component {
  state = {
    userName: '',
    userPicUrl: '',
    inputName: '',
    inputPicUrl: '',
    errorMsg: 'Error message placeholder',
  }

  onChangeInputName = (inputName) => {this.setState({ inputName: inputName })}

  onPressUpdateDisplayName = () => {
    Fire.shared.updateUserName(Fire.shared.uid, this.state.inputName, () => {
      this.setState({ userName: this.state.inputName });
      // TODO toast
    }, () => {
      // TODO toast
    });
  }

  onPressUpdateProfilePicture = async () => {
    uploadUrl = await Fire.shared.uploadImageAsync(this.state.inputPicUrl);
    Fire.shared.updateUserPicUrl(Fire.shared.uid, uploadUrl, () => {
      this.setState({userPicUrl: uploadUrl});
      // TODO toast
    }, () => {
      // TODO toast
    });
  }

  onSignout = () => {
    // // amy side note: ahh, javascript without arrows... i missed you!
    // firebase.auth().signOut().then(function() {
    //   // Sign-out successful.
    //   // don't need to do anything because firebase.auth().onAuthStateChanged() in AuthLoading.js
    // }).catch(function(error) {
    //   // TODO toast
    // })
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

  static navigationOptions = {
    title: 'Settings',
  };

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

        <Button
          title="Update display name"
          color="#49B6BB"
          onPress={this.onPressUpdateDisplayName}
        />

        <FormLabel>Picture</FormLabel>
        <Button
          title="Upload Photo"
          color="#49B6BB"
          onPress={this.onPressCamera}
        />
        {
          this.state.inputPicUrl != '' &&
          <Image
            style={styles.imagePreview}
            source={{uri: this.state.inputPicUrl}}
          />
        }

        <Button
          title="Update profile picture"
          color="#49B6BB"
          onPress={this.onPressUpdateProfilePicture}
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
    Fire.shared.getUserName(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userName: result
      }))
    })
    Fire.shared.getUserPicUrl(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userPicUrl: result
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
