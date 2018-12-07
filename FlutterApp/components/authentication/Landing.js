import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors, Metrics } from '../Themes'

import RoundButton from '../subcomponents/RoundButton';

class Landing extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/flutter.png')} />
        <Text style={styles.text}>Welcome to <Text style={styles.emphasis}>Flutter</Text>.</Text>
        <View style={styles.buttons}>
          <RoundButton
            containerStyle={styles.button}
            label="LOG IN"
            backgroundColor={'white'}
            color={Colors.dark}
            size={14}
            onPress={() => this.props.navigation.navigate('Login')} />
          <RoundButton
            containerStyle={styles.button}
            label="LOGIN WITH FACEBOOK"
            backgroundColor={'#2883D8'}
            color={'white'}
            size={14} />
          <RoundButton
            containerStyle={styles.button}
            label="SIGN UP"
            backgroundColor={Colors.dark}
            color={Colors.background}
            size={14}
            onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  image: {
    height: '13%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 19,
    fontFamily: 'Nunito',
    marginVertical: Metrics.baseMargin,
  },
  emphasis: {
    fontFamily: 'NunitoBoldItalic',
  },
  button: {
    marginVertical: Metrics.smallMargin * 1.5,
  },
  buttons: {
    marginTop: Metrics.doubleBaseMargin,
  }
})

export default Landing;
