import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../Themes'
import RoundButton from '../subcomponents/RoundButton';

import firebase from 'firebase';

import Fire from '../../Fire';

class SignUp extends React.Component {
  state = { userName: '', phone: 0, email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        Fire.shared.writeUserData(userCredential.user.uid, this.state.email, this.state.userName);
        Fire.shared.initialSetup(userCredential.user.uid);
        this.props.navigation.navigate('Main');
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  static navigationOptions = {
    headerStyle: {backgroundColor: Colors.background, borderBottomWidth: 0, elevation: 0},
    headerTintColor: Colors.teal,
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>SIGN UP</Text>
        {this.state.errorMessage &&
          <Text style={styles.errorMsg}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Display name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={userName => this.setState({ userName })}
          value={this.state.userName}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <RoundButton
          containerStyle={styles.button}
          label="LET'S GO!"
          backgroundColor={Colors.teal}
          color={'white'}
          size={14}
          onPress={() => this.handleSignUp()} />
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

export default SignUp;
