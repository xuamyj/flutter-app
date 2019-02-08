import React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import RoundButton from './subcomponents/RoundButton';


import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../GlobalStore'

const {height, width} = Dimensions.get('window');

class ShareStory extends React.Component {
  state = {
    name: (this.props.navigation.state.params || {}).name,
    index: (this.props.navigation.state.params || {}).index,
    inputItemDescription: '',
    inputItemPicUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
    errorMsgName: 'Error message placeholder: name',
    errorMsgDescription: 'Error message placeholder: description',
  }

  onChangeInputItemDescription = (inputItemDescription) => {this.setState({ inputItemDescription: inputItemDescription })}

  onPressPost = () => {
    let i = this.state.index
    ItemListStore.items[i].state = "COMPLETE";
    ItemListStore.items[i].receiver.itemDescription = this.state.inputItemDescription;
    ItemListStore.items[i].receiver.itemPicUrl = this.state.inputItemPicUrl;

    Alert.alert(
      'Story shared!',
      ('You have shared your story with ' + this.state.name + '!'),
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Profile')},
      ],
    );
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

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name,
    headerStyle: {backgroundColor: Colors.background },
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
    }
  });

  render() {

    return (
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <View>
            <Image style={styles.imagePreview} source={{uri: this.state.inputItemPicUrl}} />
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.iconContainer}>
            <Icon name={'photo'} color={Colors.dark} onPress={this.selectPhoto} containerStyle={styles.icon} size={30} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style = {[styles.textInput]}
              multiline={true}
              placeholder = "What experiences have you had with this object?"
              onChangeText={this.onChangeInputItemDescription}
            />
            <RoundButton
              containerStyle={styles.button}
              label="SHARE STORY"
              backgroundColor={Colors.teal}
              color={'white'}
              size={15}
              onPress={this.onPressPost} />
          </View>
        </ScrollView>
      </View>
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
    marginTop: width * 2 / 3 - Metrics.doubleBaseMargin,
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
});

export default view(ShareStory);
