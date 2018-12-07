import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Metrics, Colors } from './Themes';
import AutoTags from 'react-native-tag-autocomplete';

import Fire from '../Fire';

class GroupCreate extends React.Component {
  state = {
    inputGroupName: '',
    inputGroupMembers: '',
    errorMsgName: 'Error message placeholder: name',
    errorMsgMembers: 'Error message placeholder: members',

    suggestions : [ {name:''}, ],
    tagsSelected : []
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

  handleDelete = index => {
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = suggestion => {
    this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.fillout}>
                <FormLabel labelStyle={styles.label}>Group name</FormLabel>
                <FormInput onChangeText={this.onChangeInputGroupName}/>
                <View style= {{marginTop: 30, marginBottom: 10, justifyContent: 'center', alignItems: 'center',}}>
                    <Image
                    style={styles.imagePreview}
                    source={{uri: this.state.inputItemPicUrl}}
                    />
                </View>
                <Button
                title="Upload Photo"
                color="#49B6BB"
                onPress={this.onPressCamera}
                />
                <FormLabel labelStyle={styles.label}>Members</FormLabel>
                <View style = {{justifyContent: 'center', alignItems: 'center', padding: 20,}}>
                    <AutoTags
                    suggestions={this.state.suggestions}
                    tagsSelected={this.state.tagsSelected}
                    handleAddition={this.handleAddition}
                    handleDelete={this.handleDelete}
                    placeholder="Add a member.." />
                </View>
            </View>
            <View style={styles.postView}>
                <TouchableOpacity style={styles.post} onPress={this.onPressPost}>
                <Text style={{fontWeight:"bold", color: "white", fontSize: 16,}}>Create Group</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

  componentDidMount() {
    Fire.shared.getAllUsers((result) => {
      // create resultList
      let resultList = [];
      result.forEach((childResult) => {
        let userObj = {}
        let userId = childResult.key;
        let userEmail = childResult.val()['email'];
        userObj['name'] = userEmail;
        userObj['userId'] = userId;
        resultList.push(userObj);
      });

      console.log('hello there');
      console.log(resultList);

      // update suggestions (resultList)
      this.setState(previousState => ({
        suggestions: resultList,
      }))

      console.log(this.state.suggestions);

    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  fillout: {
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
    shadowOpacity: 1.0,
    elevation: 1,
  },
      postView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    label: {
      fontWeight: 'normal',
      color: Colors.dark,
      fontSize: 18,
    },
    imagePreview: {
      width: '80%',
      height: 160,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#C1C1C1',
  },
})

export default GroupCreate;
