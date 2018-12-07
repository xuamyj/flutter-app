import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

export default class StoryCard extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isGiver: true,
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

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    }
    var itemName = this.props.story.itemName;
    var groupName = this.props.story.groupName;
    var itemDescription = (this.state.isGiver === true) ? this.props.story.giveItemDescription : this.props.story.recvItemDescription;
    var activeUserName = (this.state.isGiver === true) ? this.props.story.giveUserName : this.props.story.recvUserName;
    var itemPicURL = (this.state.isGiver === true) ? this.props.story.giveItemPicUrl : this.props.story.recvItemPicUrl;
    var giveUserPicUrl = this.props.story.giveUserPicUrl;
    var recvUserPicUrl = this.props.story.recvUserPicUrl;
    var giveUserPicStyle = (this.state.isGiver === true) ? styles.activePicStyle : styles.inactivePicStyle;
    var recvUserPicStyle = (this.state.isGiver === true) ? styles.inactivePicStyle : styles.activePicStyle;

    return  (
      <TouchableWithoutFeedback onPress={this.switch} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.cardTitle}>
            <Text style={styles.itemName} ellipsizeMode={'tail'} numberOfLines={1}>{itemName}</Text>
            <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.badgeStyle}/>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:itemPicURL}} />
            <View style={styles.userPics}>
              <Avatar containerStyle={[styles.propic, giveUserPicStyle]} medium rounded source={{uri: giveUserPicUrl}} />
              <Avatar containerStyle={[styles.propic, recvUserPicStyle]} medium rounded source={{uri: recvUserPicUrl}} />
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.description}><Text style={styles.username}>{activeUserName}</Text> {itemDescription}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
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
    fontSize: 14.5,
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
  propic: {
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  description: {
    fontSize: 14,
  },
  username: {
    fontWeight: 'bold',
  },
  activePicStyle: {
    opacity: 1.0,
  },
  inactivePicStyle: {
    opacity: 0.4,
  }
})
