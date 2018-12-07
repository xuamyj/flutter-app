import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Colors, Metrics } from '../Themes'

export default class RoundButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[this.props.containerStyle, styles.buttonContainer, {backgroundColor: this.props.backgroundColor}]} onPress={this.props.onPress}>
        <Text style={{letterSpacing: 1, fontWeight:"bold", color: this.props.color, fontSize: this.props.size, fontFamily: 'NunitoBold'}}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    minWidth: "70%",
    justifyContent: 'center',
    alignItems: "center",
    padding: Metrics.baseMargin * 1.75,
    paddingHorizontal: Metrics.doubleBaseMargin * 2,
  },
});
