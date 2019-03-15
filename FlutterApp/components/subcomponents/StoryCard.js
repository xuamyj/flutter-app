import React, {Component} from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Badge, Icon } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import { Metrics, Colors } from '../Themes';
import RoundButtonSmall from '../subcomponents/RoundButtonSmall';

const {height, width} = Dimensions.get('window');

class StoryCard extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isGiver: this.props.story.giverUserId === "GIVEN",
      inputText: "",
      inputGroupPicUrl: "",
    }
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .98
    }).start();
  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 1000,
      tension: 40,
    }).start();
  }

  switch = () => {
    this.setState({
      isGiver: !this.state.isGiver,
    });
  }

  onPressShareStory = (name, key) => {
    this.props.onPressShareStory(name, key);
  }

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    }

    var receiverIsComplete = this.props.story.recvItemPicUrl !== "";
    if (!receiverIsComplete && this.props.story.recvUserId === this.props.myId && !this.state.isGiver) {
     var itemName = "❗️ " + this.props.story.itemName;
    } else {
      var itemName = this.props.story.itemName;
    }
    var groupName = this.props.story.groupName;
    var activeUserName = (this.state.isGiver === true) ? this.props.story.giveUserName : this.props.story.recvUserName;
    var inactiveUserName = (this.state.isGiver === true) ? this.props.story.recvUserName : this.props.story.giveUserName;
    var itemDescription;
    var subjectName;
    if (!receiverIsComplete && this.props.story.giveUserId === this.props.myId && this.props.isProfile && !this.state.isGiver) {
      activeUserName = this.props.story.recvUserName;
      subjectName = activeUserName;
      itemDescription = "is busy making memories with your object and hasn't shared their stories yet. Check back later!"
    } else if (!receiverIsComplete && this.props.story.recvUserId === this.props.myId && !this.state.isGiver) {
      activeUserName = this.props.story.recvUserName;
      subjectName = this.props.story.giveUserName;
      itemDescription = "is waiting for your stories with their object!";
    } else {
      activeUserName = this.state.isGiver ? this.props.story.giveUserName : this.props.story.recvUserName
      subjectName = activeUserName;
      itemDescription = this.state.isGiver ? this.props.story.giveItemDescription : this.props.story.recvItemDescription;
    }
    var itemPicUrl;
    if (this.state.isGiver) {
      itemPicUrl = this.props.story.giveItemPicUrl;
    } else if (!this.state.isGiver && receiverIsComplete) {
      itemPicUrl = this.props.story.recvItemPicUrl;
    } else if (!this.state.isGiver && this.state.inputGroupPicUrl != ""){
      itemPicUrl = this.state.inputGroupPicUrl;
    }
    else if (!this.state.isGiver){
      itemPicUrl = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640';
    }
    var giveUserPicUrl = this.props.story.giveUserPicUrl;
    var recvUserPicUrl = this.props.story.recvUserPicUrl;
    var giveUserPicStyle = this.state.isGiver ? styles.activePicStyle : styles.inactivePicStyle;
    var recvUserPicStyle = this.state.isGiver ? styles.inactivePicStyle : styles.activePicStyle;

    return  (
      <TouchableWithoutFeedback onPress={this.switch} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.cardTitle}>
            <Text style={styles.itemName} ellipsizeMode={'tail'} numberOfLines={1}>{itemName}</Text>
            <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.badgeStyle}/>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:itemPicUrl}} />
            <View style={styles.userPics}>
              <Avatar avatarStyle={styles.propicBorder} containerStyle={[styles.propic, giveUserPicStyle]} medium rounded source={{uri: giveUserPicUrl}} />
              <Avatar avatarStyle={styles.propicBorder} containerStyle={[styles.propic, recvUserPicStyle]} medium rounded source={{uri: recvUserPicUrl}} />
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.description}><Text style={styles.username}>{subjectName}</Text> {itemDescription}</Text>
            {itemDescription.substring(0, 10) === "is waiting"  &&
              <View>
                <RoundButtonSmall
                  containerStyle={styles.button}
                  label="SHARE STORY"
                  backgroundColor={Colors.teal}
                  color={'white'}
                  size={14}
                  isActive={true}
                  onPress={() => {this.onPressShareStory(itemName, this.props.story.key)}}/>
              </View>
            }
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Metrics.baseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin * 1.5,
  },
  image: {
    width: '100%',
    height: width * 9 / 16,
    resizeMode: 'cover',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  itemName: {
    fontSize: 20,
    color: Colors.dark,
    fontFamily: 'NunitoSemiBold',
    flex: 1,
    marginRight: Metrics.smallMargin,
  },
  groupName: {
    fontSize: 15,
    color: Colors.dark,
  },
  badgeStyle: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: Metrics.baseMargin,
  },
  userPics: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
  },
  propicBorder: {
    borderColor: 'white',
    borderWidth: 3.5,
   },
  propic: {
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  description: {
    fontSize: 15,
  },
  username: {
    fontWeight: 'bold',
  },
  activePicStyle: {
    opacity: 1.0,
  },
  inactivePicStyle: {
    opacity: 0.4,
  },
  button: {
    marginTop: Metrics.baseMargin * 1.5,
    marginBottom: Metrics.baseMargin,
    width: '65%',
    alignSelf: 'center',
  },
  textInput: {
    borderColor: Colors.dark,
    borderWidth: 0,
    borderBottomWidth: 1,
    margin: Metrics.baseMargin,
    fontSize: 15,
  },
})

export default StoryCard
