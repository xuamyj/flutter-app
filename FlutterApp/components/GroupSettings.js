import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Alert, Image, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import AutoTags from 'react-native-tag-autocomplete';
import RoundButton from './subcomponents/RoundButton';

import Fire from '../Fire';

const {height, width} = Dimensions.get('window');

class GroupSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},

      inputGroupName: "",
      inputGroupPicUrl: "",
      errorMsgName: 'Error message placeholder: name',
      errorMsgMembers: 'Error message placeholder: members',

      suggestions : [ {name:''}, ],
      tagsSelected: [],
    }
  }

  onChangeInputGroupName = (inputGroupName) => {
    this.setState({ inputGroupName: inputGroupName })
  }

  onPressSave = async () => {
    this.setState({
      tagsSelected: this.state.group.memberList
    })
    memberList = [];
    this.state.tagsSelected.forEach((tag) => {
      memberList.push(tag['userId']);
    });
    if (memberList.indexOf(Fire.shared.uid) == -1) {
      memberList.push(Fire.shared.uid);
    }

    uploadUrl = await Fire.shared.uploadImageAsync(this.state.inputGroupPicUrl);
    Fire.shared.writeGroupData(this.state.inputGroupName, uploadUrl, memberList, () => {
      this.props.navigation.navigate('GroupsMain');
    });
  }

  onPressCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5,2],
      });
      {this.setState({ inputGroupPicUrl: result.uri })}
    }
  }

  static navigationOptions = {
    title: 'Community Settings',
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
      <KeyboardAvoidingView style={{ flex:1, backgroundColor: 'transparent' }} behavior="padding" keyboardVerticalOffset={width * 1 / 3 - 2 * Metrics.doubleBaseMargin}>
        <View style={{ backgroundColor: Colors.teal }}>
            <Image style={styles.imagePreview} source={{uri: this.state.inputGroupPicUrl}} />
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.iconContainer}>
            <Icon name={'photo'} color={Colors.dark} onPress={this.selectPhoto} containerStyle={styles.icon} size={30} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Change Name</Text>
            <TextInput
              placeholder="What group is this?"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onChangeInputGroupName}
            />
            <Text style={styles.label}>Manage Members</Text>
            <View style = {{marginLeft: '10%', marginVertical: Metrics.baseMargin}}>
              <AutoTags
                suggestions={this.state.suggestions}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Add a member.." />
            </View>
            <RoundButton
              containerStyle={styles.button}
              label="SAVE"
              backgroundColor={Colors.teal}
              color={'white'}
              size={15}
              onPress={this.onPressSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    Fire.shared.getAllUsers((result) => {
      // create resultList
      let resultList = [];
      result.forEach((childResult) => {
        let userObj = {}
        let userId = childResult.key;
        let userDisplayName = childResult.val()['displayName'];
        userObj['name'] = userDisplayName;
        userObj['userId'] = userId;
        resultList.push(userObj);
      });

      // update suggestions (resultList)
      this.setState(previousState => ({
        suggestions: resultList,
      }))
    });
    Fire.shared.getGroup(this.props.navigation.state.params.groupId, groupResult => {
      this.setState({
        group: groupResult,
        inputGroupPicUrl: groupResult.groupPicUrl,
      });
      console.log(this.state.inputGroupPicUrl   );
    });
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
    marginTop: height / 2 - width * 9 / 20,
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
    top: height / 12,
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

export default GroupSettings;
