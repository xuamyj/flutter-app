import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button, Image, Dimensions } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import RoundButton from './subcomponents/RoundButton';

import firebase from 'firebase';

import Fire from '../Fire';

const {height, width} = Dimensions.get('window');

class Settings extends React.Component {
  state = {
    userName: '',
    userPicUrl: '',
    inputName: '',
    inputPicUrl: '',
    errorMsg: 'Error message placeholder',
  }

  onPressUpdateDisplayName = () => {
    if (this.state.inputName != '') {
      Fire.shared.updateUserName(Fire.shared.uid, this.state.inputName, () => {
          this.setState({
            userName: this.state.inputName,
            inputName: '',
           });
        // TODO toast
      }, () => {
        // TODO toast
      });
    }
  }

  onPressUpdateProfilePicture = async () => {
    uploadUrl = await Fire.shared.uploadImageAsync(this.state.inputPicUrl);
    Fire.shared.updateUserPicUrl(Fire.shared.uid, uploadUrl, () => {
      this.setState({
        userPicUrl: this.state.inputPicUrl,
      });
      // TODO toast
    }, () => {
      // TODO toast
    });
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

  onSave = () => {
    this.onPressUpdateProfilePicture();
    this.onPressUpdateDisplayName();
  }

  onPressCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
      });
      if (!result.cancelled) {this.setState({ inputPicUrl: result.uri })}
    }
  }

  static navigationOptions = {
      title: 'Settings',
      headerStyle: {backgroundColor: Colors.background },
      headerTitleStyle: {
        fontFamily: 'NunitoBold',
        fontWeight: '200',
      }
    };

  render() {


    return (
        <View style={styles.container}>
          <View style={styles.heading}>
            <View>
              <Avatar
                xlarge
                rounded
                source={{uri: this.state.inputPicUrl}}
                onPress={this.onPressCamera}
                />
              <View style={styles.iconContainer}>
                <Icon name={'edit'} color={Colors.dark} onPress={this.onPressCamera} containerStyle={styles.icon} />
              </View>
            </View>
            <Text style={styles.text}>{this.state.userName}</Text>
          </View>
          <Text style={styles.label}>Change display name</Text>
          <TextInput
            placeholder="This is the name people will be seeing!"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={inputName => this.setState({ inputName })}
            value={this.state.inputName}
          />
          <RoundButton
            containerStyle={styles.button}
            label="SAVE"
            backgroundColor={Colors.teal}
            color={'white'}
            size={14}
            onPress={this.onSave} />
          <RoundButton
            containerStyle={styles.button}
            label="LOGOUT"
            backgroundColor={Colors.background}
            color={Colors.dark}
            size={14}
            onPress={this.onSignout} />
        </View>
    );
  }

  componentDidMount() {
    Fire.shared.getUserName(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userName: result,
      }))
    })
    Fire.shared.getUserPicUrl(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userPicUrl: result,
        inputPicUrl: result,
      }))
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'normal',
    color: Colors.dark,
    fontSize: 17,
    fontFamily: 'NunitoSemiBold',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: Metrics.doubleBaseMargin,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: Colors.dark,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 15,
    marginBottom: Metrics.doubleBaseMargin * 2,
  },
  button: {
    marginVertical: Metrics.smallMargin * 1.5,
  },
  heading:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NunitoBold',
    fontSize: 24,
    marginVertical: Metrics.baseMargin,
  },
  icon: {
    padding: Metrics.smallMargin,
    borderRadius: 100,
    backgroundColor: Colors.background,
    margin: Metrics.smallMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    bottom:0,
    right:0,
  }
})

export default Settings;
