import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Metrics } from '../Themes'

export default class RoundButtonSmall extends React.Component {

  render() {
    if (this.props.isActive === true) {
      return (
        <TouchableOpacity style={[this.props.containerStyle, styles.buttonContainer, {backgroundColor: this.props.backgroundColor}]} onPress={this.props.onPress}>
          <Text style={{letterSpacing: 1, fontWeight:"bold", color: this.props.color, fontSize: this.props.size, fontFamily: 'NunitoBold'}}>{this.props.label}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[this.props.containerStyle, styles.buttonContainer, {backgroundColor: this.props.backgroundColor}]}>
          <Text style={{letterSpacing: 1, fontWeight:"bold", color: this.props.color, fontSize: this.props.size, fontFamily: 'NunitoBold'}}>{this.props.label}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    minWidth: "70%",
    justifyContent: 'center',
    alignItems: "center",
    padding: Metrics.baseMargin * 1.25,
    paddingHorizontal: Metrics.doubleBaseMargin * 1.5,
  },
});
