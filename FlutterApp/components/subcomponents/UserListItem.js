import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

export default class UserListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.onPress(this.props.chat.key)}}>
      <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Avatar containerStyle={styles.propic} small rounded source={{uri: this.props.chat.picUrl}} />
        <View style={styles.text}>
          <View style={styles.heading}>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{this.props.chat.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.border} />
      </View>
      </TouchableOpacity>
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
    paddingHorizontal: Metrics.doubleBaseMargin ,
    paddingVertical: Metrics.smallMargin * 1.5,
  },
  propic: {
    marginRight: Metrics.baseMargin,
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
  border: {
    width: '90%',
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  }
})
