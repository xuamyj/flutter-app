import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Create a group
        </Text>

        <FormLabel>Group name</FormLabel>
        <FormInput onChangeText={this.onChangeInputGroupName}/>
        <FormValidationMessage>{this.state.errorMsgName}</FormValidationMessage>

        <FormLabel>Members</FormLabel>
        <FormInput onChangeText={this.onChangeInputGroupMembers}/>
        <FormValidationMessage>{this.state.errorMsgMembers}</FormValidationMessage>

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
  }
})

export default GroupCreate;
