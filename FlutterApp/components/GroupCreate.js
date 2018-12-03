import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

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
    title: 'New Group',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Create a group
        </Text>
          <View style={styles.fillout}>
          <FormLabel>Group name</FormLabel>
          <FormInput onChangeText={this.onChangeInputGroupName}/>
          <FormValidationMessage>{this.state.errorMsgName}</FormValidationMessage>

          <FormLabel>Members</FormLabel>
          <FormInput onChangeText={this.onChangeInputGroupMembers}/>
          <FormValidationMessage>{this.state.errorMsgMembers}</FormValidationMessage>
        </View>
        <Button
          title="Create"
          color="#49B6BB"
          onPress={this.onPressCreate}
        />
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
    flex: 1,
  },
})

export default GroupCreate;
