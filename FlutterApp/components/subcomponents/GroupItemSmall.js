import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

const {height, width} = Dimensions.get('window');

export default class GroupItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.image} source={{uri:this.props.group.picUrl}} />
          <Text style={styles.groupName}>{this.props.group.name}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width * 0.2,
    resizeMode: 'cover',
    borderRadius: Metrics.baseMargin,
    opacity: 0.7,
  },
  groupName: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
  },
  groupName: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    fontFamily: 'NunitoSemiBold',
    fontSize: 19,
    letterSpacing: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin * 1.5,
  },
})
