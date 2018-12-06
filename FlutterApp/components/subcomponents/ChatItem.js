import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

export default class ChatItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Avatar containerStyle={styles.propic} medium rounded source={{uri: this.props.chat.picUrl}} />
        <View style={styles.text}>
          <View style={styles.heading}>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{this.props.chat.name}</Text>
            <Text style={styles.date}>Dec 4</Text>
          </View>
          <Text style={styles.preview} ellipsizeMode={'tail'} numberOfLines={1}>{this.props.chat.subtitle}</Text>
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
