import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';

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
      headerStyle: {backgroundColor: Colors.background},
  };

  render() {


    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top: 10, right: 10}}>
                <Button
                title="Logout"
                color="grey"
                onPress={this.onSignout}
                />
            </View>
            <View style={styles.heading}>
                <Avatar
                large
                rounded
                source={{uri: this.state.userPicUrl}}
                activeOpacity={0.7}
                />
                <Text style = {styles.text}>
                {this.state.userName}
                </Text>
            </View>
            <FormLabel>Display name</FormLabel>
            <View style={styles.displayName}>
                <FormInput onChangeText={this.onChangeInputName} inputStyle = {{color: 'black'}} containerStyle= {{width: "80%"}}/>
                <TouchableOpacity onPress={this.onPressUpdateDisplayName} style={{marginRight: 20,}}>
                    <Image style={styles.image} source={require("../assets/confirm.png")}/>
                </TouchableOpacity>
            </View>
            <FormValidationMessage>{this.state.errorMsg}</FormValidationMessage>
            <FormLabel containerStyle= {{marginTop: 15}}>Profile picture</FormLabel>
            <View style={styles.photoPreview}>
                <View style={{marginLeft: 10,}}>
                <Button
                title="Change Photo"
                color="#49B6BB"
                onPress={this.onPressCamera}
                />
                </View>
                {
                    this.state.inputPicUrl != '' &&
                    <Image
                    style={styles.imagePreview}
                    source={{uri: this.state.inputPicUrl}}
                    />
                }
                <TouchableOpacity onPress={this.onPressUpdateProfilePicture} style={{marginRight: 20, marginLeft: 20,}}>
                    <Image style={styles.image} source={require("../assets/confirm.png")}/>
                </TouchableOpacity>
            </View>
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
    borderRadius:40,
  },
  heading:{
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 10,
  },
  displayName: {
      flexDirection: "row",
      justifyContent: "space-evenly",
  },
  image: {
      width: 30,
      height: 30,
  },
  photoPreview: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      marginTop: 15,
  },
})

export default Settings;
