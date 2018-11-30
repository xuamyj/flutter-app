import React from 'react';
import { Text, View, StyleSheet, Button, Picker, Image, Dimensions, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import { TextField } from 'react-native-material-textfield';

const {height, width} = Dimensions.get('window');

class PostMain extends React.Component {
  state = {
    groupList: [
      {
        name: 'CS147',
        key: '28327298',
      },
      {
        name: 'Disney',
        key: '56755554',
      },
      {
        name: 'Camping',
        key: '90057000',
      },
    ],
    inputItemName: '',
    inputItemDescription: '',
    inputItemPicUrl: '',
    inputGroupKey: '28327298',
    errorMsgName: 'Error message placeholder: name',
    errorMsgDescription: 'Error message placeholder: description',
  }

  onChangeInputItemName = (inputItemName) => {this.setState({ inputItemName: inputItemName })}
  onChangeInputItemDescription = (inputItemDescription) => {this.setState({ inputItemDescription: inputItemDescription })}

  onPressPost = () => {
    // TODO backend
    console.log(this.state.inputItemName);
    console.log(this.state.inputItemDescription);
    console.log(this.state.inputItemPicUrl);
    console.log(this.state.inputGroupKey);
  }

  onPressCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      {this.setState({ inputItemPicUrl: result.uri })}
    }
  }

  static navigationOptions = {
    title: 'Give',
  };

  render() {
    let itemName;
    let description;
    return (
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.input}>

          <TextField
            label={'What are you giving away?'}
            value={itemName}
            onChangeText={(itemName) => this.onChangeInputItemName}
            titleTextStyle={styles.formLabel}
            editable={true}
            tintColor={Colors.dark}
            style={styles.input}/>

          <Button
            title="Include a photo!"
            color="#49B6BB"
            onPress={this.onPressCamera}
          />

          <TextField
            label={'Tell us a little more about this item!'}
            value={description}
            onChangeText={(description) => this.onChangeInputItemDescription}
            multiline={true}
            editable={true}
            tintColor={Colors.dark}
            style={styles.input}/>

            <Text>Post to a group! </Text>
          <Picker
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => this.setState({inputGroupKey: itemValue})}>
            {
              this.state.groupList.map((l) => (
                <Picker.Item label={l.name} value={l.key} key={l.key} />
              ))
            }
          </Picker>
        </View>

        <View style={styles.postButton}>
          <Button
            title="POST GIFT"
            color="#49B6BB"
            onPress={this.onPressPost}
          />
        </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  imagePreview: {
    width: 80,
    height: 80,
  },
  formLabel: {
    fontWeight: 'normal',
    color: Colors.dark,
    fontSize: 12,
  },
  input: {
    marginBottom: Metrics.doubleBaseMargin,
  }
})

export default PostMain;
