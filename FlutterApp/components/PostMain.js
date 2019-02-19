import React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import RoundButton from './subcomponents/RoundButton';
import Carousel from 'react-native-snap-carousel';
import GroupItemSmall from './subcomponents/GroupItemSmall';


import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../GlobalStore'

const {height, width} = Dimensions.get('window');

class PostMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputItemName: '',
      inputItemDescription: '',
      inputItemPicUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
      inputGroupKey: GroupListStore.groups[0].groupId,
      errorMsgName: 'Error message placeholder: name',
      errorMsgDescription: 'Error message placeholder: description',
    };
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this.setState({
        inputItemName: '',
        inputItemDescription: '',
        inputItemPicUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
        inputGroupKey: GroupListStore.groups[0].groupId,
        errorMsgName: 'Error message placeholder: name',
        errorMsgDescription: 'Error message placeholder: description',
      });
    });
  }

  onChangeInputItemName = (inputItemName) => {this.setState({ inputItemName: inputItemName })};
  onChangeInputItemDescription = (inputItemDescription) => {this.setState({ inputItemDescription: inputItemDescription })};
  onChangeGroup = (inputGroupKey) => {
    this.setState({inputGroupKey: this.groups[inputGroupKey].key})
  }

  onPressPost = () => {
    postIsIncomplete = (this.state.inputItemName == "") ||
    (this.state.inputItemDescription == "") ||
    (typeof this.state.inputItemPicUrl === "undefined");

    if (postIsIncomplete){
      missingItems = "";
      if (this.state.inputItemName == "") {
        missingItems += "a name for the item";
      }
      if (this.state.inputItemDescription == "") {
        if (missingItems != "") {
          missingItems += " and "
        }
        missingItems += "a description of the item";
      }
      if (typeof this.state.inputItemPicUrl === "undefined") {
        if (missingItems != "") {
          missingItems += " and "
        }
        missingItems += "a photo of the item";
      }
      missingItems += ".";

      Alert.alert(
        'Unable to Post Item',
        ('Please include ' + missingItems),
        [
          {text: 'OK'},
        ],
      );

    } else {
      ItemListStore.items.unshift({
        itemId: this.state.inputItemName,
        itemName: this.state.inputItemName,
        groupId: this.state.inputGroupKey,
        state: "POSTED",
        giver: {
          id: UserStore.userId,
          itemDescription: this.state.inputItemDescription,
          itemPicUrl: this.state.inputItemPicUrl,
        }
      })
      Alert.alert(
        'Item posted!',
        ('You have posted ' + this.state.inputItemName + '!'),
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('HOME')},
        ],
      );
    }
  }

  selectPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,2],
      });
      if (!result.cancelled) {
        this.setState({ inputItemPicUrl: result.uri });
      }
    }
  }

  renderItem = ({item}) => {
    return (
      <GroupItemSmall group={item}/>
    )
  }

  static navigationOptions = {
    title: 'Give',
    headerStyle: {backgroundColor: Colors.background },
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
    }
  };

  render() {
    let groupResultList = [];
    GroupListStore.groups.forEach((group) => {
      if (group['memberList'].indexOf(UserStore.userId) != -1) {
        tempGroupResult = {
          name: group['groupName'],
          key: group['groupId'],
          picUrl: group['groupPicUrl'],
        }
        groupResultList.push(tempGroupResult);
      }
    });
    this.groups = groupResultList;

    return (
      <KeyboardAvoidingView style={{ flex:1, backgroundColor: 'transparent' }} behavior="padding" keyboardVerticalOffset={width * 1 / 3 - 2 * Metrics.doubleBaseMargin}>
        <View>
            <Image style={styles.imagePreview} source={{uri: this.state.inputItemPicUrl}} />
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.iconContainer}>
            <Icon name={'photo'} color={Colors.dark} onPress={this.selectPhoto} containerStyle={styles.icon} size={30} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="What are you giving away?"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onChangeInputItemName}
              defaultValue={this.state.inputItemName}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style = {[styles.textInput]}
              multiline={true}
              placeholder = "Why is it meaningful to you?"
              onChangeText={this.onChangeInputItemDescription}
              defaultValue={this.state.inputItemDescription}
            />
            <Text style={styles.label}>Group</Text>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={groupResultList}
                renderItem={this.renderItem}
                sliderWidth={width}
                itemWidth={width * 0.65}
                enableMomentum={true}
                onSnapToItem={this.onChangeGroup}
                containerCustomStyle={styles.groups}
                inactiveSlideScale={0.8}
                inactiveSlideOpacity={0.6}
              />
            <RoundButton
              containerStyle={styles.button}
              label="GIVE ITEM"
              backgroundColor={Colors.teal}
              color={'white'}
              size={15}
              onPress={this.onPressPost} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imagePreview: {
    height: width * 2 / 3,
    width: width,
    position: 'absolute',
    resizeMode: 'cover',
    top:0,
    left:0
  },
  formContainer: {
    width: '100%',
    marginTop: height / 2 - width * 5 / 24,
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
    top: height * 1 / 4,
    right:0,
  }
})

export default view(PostMain);
