import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Metrics, Colors } from './Themes';

class GroupCreate extends React.Component {
  state = {
    inputGroupName: '',
    inputGroupMembers: '',
    errorMsgName: 'Error message placeholder: name',
    errorMsgMembers: 'Error message placeholder: members',
  }

  onChangeInputGroupName = (inputGroupName) => {this.setState({ inputGroupName: inputGroupName })}
  onChangeInputGroupMembers = (inputGroupMembers) => {this.setState({ inputGroupMembers: inputGroupMembers })}

  onPressCreate = () => {
    // TODO backend
    console.log(this.state.inputGroupName);
    console.log(this.state.inputGroupMembers);
    Alert.alert(
      'Group created!',
      ('You have created the group ' + this.state.inputGroupName + '!'),
      [
        {text: 'OK'},
      ],
    );
  }

  static navigationOptions = {
    title: 'Create New Group',
    headerStyle: {backgroundColor: Colors.background },
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fillout}>
          <FormLabel>Group name</FormLabel>
          <FormInput onChangeText={this.onChangeInputGroupName}/>
          <FormValidationMessage>{this.state.errorMsgName}</FormValidationMessage>
        </View>
        <View style={styles.fillout}>
          <FormLabel>Members</FormLabel>
          <FormInput onChangeText={this.onChangeInputGroupMembers}/>
          <FormValidationMessage>{this.state.errorMsgMembers}</FormValidationMessage>
        </View>
        <View style={styles.postView}>
        <TouchableOpacity style={styles.post} onPress={this.onPressPost}>
          <Text style={{fontWeight:"bold", color: "white", fontSize: 16,}}>Create Group</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  fillout: {
    margin: 10,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  shadowOffset: {
    width: 0.5,
    height: 0.5
  },
  shadowRadius: 15,
  shadowOpacity: 1,
  },
  post: {
      borderRadius: 30,
      backgroundColor: "#49B6BB",
      width: "60%",
      height: 50,
      justifyContent: 'center',
      alignItems: "center",
      shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 10,
    shadowOpacity: 1.0
  },
      postView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
})

export default GroupCreate;
