import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../Themes'
import RoundButton from '../subcomponents/RoundButton';

import firebase from 'firebase';

class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  static navigationOptions = {
    headerStyle: {backgroundColor: Colors.background, borderBottomWidth: 0, elevation: 0},
    headerTintColor: Colors.teal,
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>LOGIN</Text>
        {this.state.errorMessage &&
          <Text style={styles.errorMsg}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.forgotContainer}>
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}> Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <RoundButton
          containerStyle={styles.button}
          label="LET'S GO!"
          backgroundColor={Colors.teal}
          color={'white'}
          size={14}
          onPress={() => this.handleLogin()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    fontFamily: 'NunitoBold',
    letterSpacing: 1.5,
    fontSize: 24,
    marginBottom: Metrics.doubleBaseMargin * 2,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: Colors.dark,
    borderWidth: 0,
    borderBottomWidth: 1,
    margin: Metrics.baseMargin,
    fontSize: 16,
  },
  errorMsg: {
    color: 'red'
  },
  button: {
    margin: Metrics.doubleBaseMargin * 3,
  },
  forgotText: {
    color: Colors.lightText,
    fontSize: 15,
  },
  forgotContainer: {
    marginRight: '10%',
    alignSelf: 'flex-end',
  }
})

export default Login;
