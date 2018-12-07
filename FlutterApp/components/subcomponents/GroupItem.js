import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

export default class GroupItem extends React.Component {

  constructor(props) {
    super(props);
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

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    }

    var membersLabel = this.props.group.size - 3;
    var extraMembers = null;
    if (membersLabel > 0) {
      extraMembers = <Avatar containerStyle={styles.propic} medium rounded title={"+"+membersLabel} />
    }

    return (
      <TouchableWithoutFeedback onPress={() => {this.props.openGroup(this.props.group.name)}} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Image style={styles.image} source={{uri:this.props.group.picUrl}} />
          <Text style={styles.groupName}>{this.props.group.name}</Text>
          <View style={styles.memberContainer}>
            <View style={styles.groupMembersContainer}>
              <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.props.group.user1}} />
              <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.props.group.user2}} />
              <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.props.group.user3}} />
              {extraMembers}
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    height: 120,
    resizeMode: 'cover',
    borderRadius: Metrics.baseMargin,
    opacity: 0.25,
  },
  groupName: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
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
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  groupName: {
    position: 'absolute',
    flex: 1,
    fontFamily: 'NunitoSemiBold',
    color: Colors.dark,
    fontSize: 23,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin * 1.5,
  }
})
