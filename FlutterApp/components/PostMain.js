import React from 'react';
import { Text, View, StyleSheet, Button, Picker, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Post a treasure
        </Text>

        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={this.onChangeInputItemName}/>
        <FormValidationMessage>{this.state.errorMsgName}</FormValidationMessage>

        <FormLabel>Picture</FormLabel>
        <Button
          title="Upload Photo"
          color="#49B6BB"
          onPress={this.onPressCamera}
        />
        <Image
          style={styles.imagePreview}
          source={{uri: this.state.inputItemPicUrl}}
        />

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={this.onChangeInputItemDescription}/>
        <FormValidationMessage>{this.state.errorMsgDescription}</FormValidationMessage>

        <FormLabel>Post to</FormLabel>
        <Picker
          selectedValue={this.state.inputGroupKey}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({inputGroupKey: itemValue})}>
          {
            this.state.groupList.map((l) => (
              <Picker.Item label={l.name} value={l.key} key={l.key} />
            ))
          }
        </Picker>

        <Button
          title="Post"
          color="#49B6BB"
          onPress={this.onPressPost}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    width: 80,
    height: 80,
  },
})

export default PostMain;
