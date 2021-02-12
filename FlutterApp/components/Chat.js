import React, { Component } from 'react';
import {KeyboardAvoidingView, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icons from './Themes/Icons';
import { GiftedChat } from 'react-native-gifted-chat';
import { Metrics, Colors } from './Themes';
import { withNavigation } from 'react-navigation';

import Fire from '../Fire';

class Chat extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).otherName || 'Chat!',
    headerStyle: {backgroundColor: Colors.background},
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
      color: Colors.dark,
    },
    headerRight: (true) ? (
      <View style={styles.headerButton}>
        <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}>
          <Icons
            iconName={'gift'}
            size={22}
            tintColor={'#49B6BB'}
            />
        </TouchableOpacity>
      </View>
    ) : null,
    headerBackTitle: null,
    headerTintColor: Colors.teal,
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    this.callbackGetUserName = Fire.shared.getUserName(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userName: result,
      }))
    })
    this.callbackgetUserPicUrl = Fire.shared.getUserPicUrl(Fire.shared.uid, result => {
      this.setState(previousState => ({
        userPicUrl: result
      }))
    })
    this.updateMessageList();
  }

  updateMessageList = () => {
    messageList = [];
    Fire.shared.getAllMessages(this.props.navigation.state.params.chatKey, messagesResult => {
      messagesResult.forEach(message => {
        messageList.unshift(message.val());
      })
      this.setState(previousState => ({
        messages: messageList,
      }))
    })
  }

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.state.userName,
      _id: Fire.shared.uid,
      avatar: this.state.userPicUrl,
    };
  }

  onSend = (messages = []) => {
    let chatKey = this.props.navigation.state.params.chatKey;
    Fire.shared.writeMessageData(chatKey, messages[0].text, this.user);
    this.updateMessageList();
    if (this.props.navigation.state.params.needUpdate != false) {
      this.props.navigation.state.params.updateChatList();
    }
  }

  render() {
    return (
      <View style={{ flex:1 }}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.user}
      />
      </View>
    );
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

const styles = StyleSheet.create({
  headerButton:{
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default withNavigation(Chat);
