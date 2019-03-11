import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

import Fire from '../../Fire';

export default class ChatItem extends React.Component {

  render() {
    var otherUserPicUrl = this.props.chat.otherUserPicUrl;
    var otherUserName = this.props.chat.otherUserName;
    console.log(this.props.chat.messages);
    var lastMessage = this.props.chat.messages[0];

    var moment = require('moment');
    var formattedDate = moment(new Date(lastMessage.createdAt)).format("MMM D");

    return (
      <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Avatar containerStyle={styles.propic} medium rounded source={{uri: otherUserPicUrl}} />
        <View style={styles.text}>
          <View style={styles.heading}>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{otherUserName}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.preview} ellipsizeMode={'tail'} numberOfLines={1}>{lastMessage.text}</Text>
        </View>
      </View>
      <View style={styles.border} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin * 1.5,
  },
  propic: {
    marginRight: Metrics.doubleBaseMargin,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: Colors.dark,
  },
  date: {
    fontSize: 13,
    color: Colors.dark,
  },
  preview: {
    fontSize: 14,
    color: Colors.lightText,
  },
  border: {
    width: '90%',
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  }
})
