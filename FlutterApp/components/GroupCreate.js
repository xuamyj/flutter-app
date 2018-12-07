import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Alert, Image, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import AutoTags from 'react-native-tag-autocomplete';
import RoundButton from './subcomponents/RoundButton';

import Fire from '../Fire';

const {height, width} = Dimensions.get('window');

class GroupCreate extends React.Component {
  state = {
    inputGroupName: '',
    inputGroupPicUrl: '',
    errorMsgName: 'Error message placeholder: name',
    errorMsgMembers: 'Error message placeholder: members',
    inputGroupPicUrl: '',

    suggestions : [ {name:''}, ],
    tagsSelected : []
  }

  onChangeInputGroupName = (inputGroupName) => {this.setState({ inputGroupName: inputGroupName })}

  onPressCreate = async () => {
    memberList = []
    this.state.tagsSelected.forEach((tag) => {
      memberList.push(tag['userId']);
    });
    if (memberList.indexOf(Fire.shared.uid) == -1) {
      memberList.push(Fire.shared.uid);
    }

    uploadUrl = await Fire.shared.uploadImageAsync(this.state.inputGroupPicUrl);
    Fire.shared.writeGroupData(this.state.inputGroupName, uploadUrl, memberList, () => {
      this.props.navigation.navigate('Group', {name: this.state.inputGroupName});
    }, () => {
      // TODO toast
    });
  }

  static navigationOptions = {
    title: 'Create New Group',
    headerStyle: {backgroundColor: Colors.background },
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
      color: Colors.dark,
    },
    headerTintColor: Colors.teal,
  };

  selectPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5,2],
      });
      if (!result.cancelled) {
        this.setState({ inputGroupPicUrl: result.uri });
      }
    }
  }

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
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <View style={{ backgroundColor: Colors.teal }}>
            <Image style={styles.imagePreview} source={{uri: this.state.inputGroupPicUrl}} />
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.iconContainer}>
            <Icon name={'photo'} color={Colors.dark} onPress={this.selectPhoto} containerStyle={styles.icon} size={30} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="What group is this?"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onChangeInputGroupName}
            />
            <Text style={styles.label}>Members</Text>
            <View style = {{marginVertical: Metrics.baseMargin}}>
              <AutoTags
                suggestions={this.state.suggestions}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Add a member.." />
            </View>
            <RoundButton
              containerStyle={styles.button}
              label="CREATE GROUP"
              backgroundColor={Colors.teal}
              color={'white'}
              size={15}
              onPress={this.onPressCreate} />
          </View>
        </ScrollView>
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

      // update suggestions (resultList)
      this.setState(previousState => ({
        suggestions: resultList,
      }))
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.teal,
  },
  imagePreview: {
    height: width * 2 / 5,
    width: width,
    position: 'absolute',
    resizeMode: 'cover',
    top:0,
    left:0,
    backgroundColor: Colors.teal,
  },
  formContainer: {
    width: '100%',
    marginTop: width * 2 / 5 - Metrics.doubleBaseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 3,
    borderTopLeftRadius: Metrics.doubleBaseMargin,
    borderTopRightRadius: Metrics.doubleBaseMargin,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'normal',
    color: Colors.dark,
    fontSize: 19,
    fontFamily: 'NunitoSemiBold',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: Metrics.baseMargin * 3,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: Colors.dark,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  groups: {
    marginTop: Metrics.doubleBaseMargin,
  },
  button: {
    margin: Metrics.doubleBaseMargin * 3,
  },
  icon: {
    padding: Metrics.baseMargin,
    borderRadius: 100,
    backgroundColor: 'white',
    margin: Metrics.baseMargin,
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
    padding: Metrics.baseMargin,
    top: width / 6 - Metrics.baseMargin * 3,
    right:0,
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
})

export default GroupCreate;
