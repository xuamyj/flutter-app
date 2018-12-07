import React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, TouchableOpacity, Picker, Image, Alert, ScrollView } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from './Themes';
import RoundButton from './subcomponents/RoundButton';
import Carousel from 'react-native-snap-carousel';
import GroupItemSmall from './subcomponents/GroupItemSmall';

const {height, width} = Dimensions.get('window');

class PostMain extends React.Component {
  state = {
    groupList: [
      {
        name: 'CS147',
        key: '28327298',
        picUrl: 'http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/need.jpg',
      },
      {
        name: 'Disney',
        key: '56755554',
        picUrl: 'https://nerdist.com/wp-content/uploads/2015/03/maxresdefault-970x545.jpg',
      },
      {
        name: 'Camping',
        key: '90057000',
        picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyM_i7rIKIc-wHw_VeW8lAyc68-zA3VcdT8zx97bG_QccOWLkt3w',
      },
    ],
    inputItemName: '',
    inputItemDescription: '',
    inputItemPicUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
    inputGroupKey: '28327298',
    errorMsgName: 'Error message placeholder: name',
    errorMsgDescription: 'Error message placeholder: description',
  }

  componentWillMount() {
    {this.selectPhoto()}
  }

  onChangeInputItemName = (inputItemName) => {this.setState({ inputItemName: inputItemName })}
  onChangeInputItemDescription = (inputItemDescription) => {this.setState({ inputItemDescription: inputItemDescription })}
  onChangeGroup = (inputGroupKey) => {this.setState({inputGroupKey: inputGroupKey})}

  onPressPost = () => {
    console.log(this.state.inputItemName);
    console.log(this.state.inputItemDescription);
    console.log(this.state.inputItemPicUrl);
    console.log(this.state.inputGroupKey);
    this.setState({
      inputItemName: '',
      inputItemDescription: '',
      inputItemPicUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
      inputGroupKey: '28327298',
      errorMsgName: 'Error message placeholder: name',
      errorMsgDescription: 'Error message placeholder: description',
    })
    Alert.alert(
      'Item posted!',
      ('You have posted ' + this.state.inputItemName + '!'),
      [
        {text: 'OK'},
      ],
    );

    this.props.navigation.navigate('HOME'); //
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
    return (
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <View>
          <TouchableOpacity onPress={this.selectPhoto}>
            <Image style={styles.imagePreview} source={{uri: this.state.inputItemPicUrl}} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.imageContainer}>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="What are you giving away?"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onChangeInputItemName}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style = {styles.description}
              multiline={true}
              style={styles.textInput}
              placeholder = "Why is it meaningful to you?"
              onChangeText={this.onChangeInputItemDescription}
            />
            <Text style={styles.label}>Group</Text>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.groupList}
                renderItem={this.renderItem}
                sliderWidth={width}
                itemWidth={width * 0.65}
                enableMomentum={true}
                onSnapToItem={this.onChangeGroup}
                containerCustomStyle={styles.groups}
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
    marginTop: Metrics.doubleBaseMargin,
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
})

export default PostMain;
