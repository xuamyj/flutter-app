import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

import Fire from '../../Fire';

const {height, width} = Dimensions.get('window');

export default class GroupItem extends React.Component {

  constructor(props) {
    super(props);
    let group = props.group;
    this.state = {
      name: group.name,
      id: group.key,
      picUrl: group.picUrl,
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

  getUserPicUrl(id) {
    switch (id) {
      case 1:
        return this.props.group.user1;
      case 2:
        return this.props.group.user2;
      case 3:
        return this.props.group.user3;
      default:
        return "";
    }
  }

  getRemainingUsers() {
    let remaining = this.props.group.size - 3;
    return "+" + remaining;
  }

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    };

    return (
      <TouchableWithoutFeedback onPress={() => {this.props.openGroup(this.state.id)}} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Image style={styles.image} source={{uri:this.state.picUrl}} />
          <Text style={styles.groupName}>{this.state.name}</Text>
          <View style={styles.memberContainer}>
            <View style={styles.groupMembersContainer}>
              {this.props.group.size > 0 && <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.getUserPicUrl(1)}} /> }
              {this.props.group.size > 1 && <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.getUserPicUrl(2)}} /> }
              {this.props.group.size > 2 && <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.getUserPicUrl(3)}} /> }
              {this.props.group.size > 3 && <Avatar containerStyle={styles.propic} medium rounded title={this.getRemainingUsers()} /> }
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkTeal,
    borderRadius: Metrics.baseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    marginHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin * 1.25,
  },
  image: {
    width: '100%',
    height: width * 0.3,
    resizeMode: 'cover',
    borderRadius: Metrics.baseMargin,
    opacity: 0.6,
  },
  groupName: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'NunitoSemiBold',
    color: 'white',
    fontSize: 24,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin * 1.5,
  },
  groupMembersContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
  },
  propic: {
    marginBottom: Metrics.smallMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
    marginRight: Metrics.baseMargin,
  },
  memberContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
