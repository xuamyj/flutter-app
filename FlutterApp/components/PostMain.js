import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Picker, Image, Alert, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';

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
    Alert.alert(
      'Item posted!',
      ('You have posted ' + this.state.inputItemName + '!'),
      [
        {text: 'OK'},
      ],
    );
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
    headerStyle: {backgroundColor: Colors.background, shadowColor: 'transparent', elevation: 0},
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.fillout}>
          <FormLabel>Post Title</FormLabel>
          <FormInput onChangeText={this.onChangeInputItemName}/>
          <View style = {{paddingVertical:10}}>
            <FormLabel>Picture</FormLabel>
          </View>
          <View style= {{alignItems: 'center',}}>
              <Image
                style={styles.imagePreview}
                source={{uri: this.state.inputItemPicUrl}}
              />
              <Button
                title="Upload Photo"
                color="#49B6BB"
                onPress={this.onPressCamera}
              />
          </View>

          <FormLabel>Description</FormLabel>
          <TextInput
            style = {{margin: 20, paddingLeft: 8, height: 60, borderColor: '#C1C1C1', borderWidth: 1, borderRadius: 5,}}
            multiline={true}
            placeholder = "Why is it meaningful to you? When did you last use it?"
            numberOfLines={4}
            onChangeText={this.onChangeInputItemDescription}
          />
              <View >
              <FormLabel>Group</FormLabel>
                <Picker
                  selectedValue={this.state.inputGroupKey}
                  onValueChange={(itemValue, itemIndex) => this.setState({inputGroupKey: itemValue})}>
                  {
                    this.state.groupList.map((l) => (
                      <Picker.Item label={l.name} value={l.key} key={l.key} />
                    ))
                  }
                </Picker>
              </View>
              <View style={styles.postView}>
              <TouchableOpacity style={styles.post} onPress={this.onPressPost}>
                <Text style={{fontWeight:"bold", color: "white", fontSize: 16,}}>Give</Text>
              </TouchableOpacity>
              </View>

        </View>
      </ScrollView>
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
  centerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C1C1C1',
}, post: {
    borderRadius: 20,
    backgroundColor: "#49B6BB",
    width: "60%",
    height: 40,
    justifyContent: 'center',
    alignItems: "center",
},
    postView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    }
})

export default PostMain;
