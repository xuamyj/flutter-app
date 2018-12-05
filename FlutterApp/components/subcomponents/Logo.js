import React from 'react';
import { StyleSheet, Text, Image, View} from 'react-native';
import { Colors, Metrics, Fonts } from '../Themes'

export default class Logo extends React.Component {
  render() {
    return (
      <Fonts>
      <View style={styles.header}>
        <Image
          source={require("../../assets/flutter.png")}
          style={styles.logo}
        />
        <Text style={{fontFamily:'NunitoSemiBold', fontSize: 20, fontWeight: '200'}}>flutter</Text>
      </View>
      </Fonts>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: Metrics.screenWidth * 0.075,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.doubleBaseMargin,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
