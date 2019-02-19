import React, { Component } from 'react';
import {KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Metrics, Colors } from './Themes';

import Fire from '../Fire';

import { view } from 'react-easy-state';
import { ChatListStore, UserListStore, UserStore } from '../GlobalStore';

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).otherName || 'Chat!',
    headerStyle: {backgroundColor: Colors.background},
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
      color: Colors.dark,
    },
    headerTintColor: Colors.teal,
  });

  state = {
    messages: [],
  };

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: UserListStore.getUserObject(UserStore.userId).displayName,
      _id: UserStore.userId,
    };
  }

  onSend = (messages = []) => {
    var chat = ChatListStore.getChat(this.props.navigation.state.params.chat.key);
    var timestamp = new Date();
    chat.messages.push({
      text: messages[0].text,
      timestamp: timestamp.getTime(),
      userId: this.user._id,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    if (this.props.navigation.state.params.needUpdate != false) {
      this.props.navigation.state.params.updateChatList();
    }
  }

  createMessageObj = (message) => {
    //  CHANGE ID DEFINITION
    return({
      _id: message.text.length,
      text: message.text,
      createdAt: message.timestamp,
      user: {
        _id: message.userId,
        name: UserListStore.getUserObject(message.userId).displayName,
        avatar: UserListStore.getUserObject(message.userId).userPicUrl,
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1, backgroundColor: 'transparent' }} behavior="padding" keyboardVerticalOffset={4*Metrics.doubleBaseMargin}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.user}
      />
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    // Fire.shared.on(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message),
    //   }))
    // );
    var messageList = this.state.messages;
    this.props.navigation.state.params.chat.messages.forEach((message) => {
      messageList.unshift(this.createMessageObj(message));
    });
    this.setState({
      messages: messageList,
    })
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
