import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, Button, View} from 'react-native';
import { Colors, Metrics } from '../Themes'

export default class Logo extends React.Component {
  render() {
    return (
      <Image
        source={require("../../assets/flutter-logo3.png")}
        style={styles.logo}
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: Metrics.screenWidth * 0.3,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.doubleBaseMargin,
    resizeMode: 'contain',
  },
});
