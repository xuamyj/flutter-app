import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
      />
    );
  }
}

export default Chat;
