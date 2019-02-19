import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import ChatItem from './subcomponents/ChatItem';
import Search from './subcomponents/Search';

import { view } from 'react-easy-state';
import { UserStore, UserListStore, ChatListStore } from '../GlobalStore';

class ChatMain extends React.Component {
  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  state = {
    chatList: [],
  }

  componentDidMount() {
    this.updateChatList();
  }

  onPressNewChat = () => {
    this.props.navigation.navigate('Chat', { name: 'TODO fix chat' });
  }

  onPressChat = (chat) => {
    var otherName = UserListStore.getUserObject(chat.otherUserId).displayName;
    this.props.navigation.navigate('Chat', { chat: chat, otherName: otherName, updateChatList: this.updateChatList });
  }

  updateChatList = () => {
    let userId = UserStore.userId;
    let chatList = [];
    ChatListStore.chats.forEach((chat)=>{
      let chatObj = ChatListStore.getChat(chat.key)

      // if it is user's chats
      if (chatObj.userIds[0] == userId) {
        chatList.push(this.createChatObject(chat.key, userId, chatObj.userIds[1]))
      } else if (chat.userIds[1] == userId) {
        chatList.push(this.createChatObject(chat.key, userId, chatObj.userIds[0]));
      }
    });
    this.setState({
      chatList: chatList,
    });
  }

  static navigationOptions = {
    title: 'Messages',
    headerStyle: {backgroundColor: Colors.background, shadowColor: 'transparent', elevation: 0},
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
      color: Colors.dark,
    },
    headerBackTitle: null,
    headerTintColor: Colors.teal,
  };

  renderChat = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.onPressChat(item)}>
        <ChatItem chat={item}/>
      </TouchableOpacity>
    )
  }

  createChatObject(key, myId, otherId) {
    var chat = ChatListStore.getChat(key);

    return {
      myUserId: myId,
      otherUserId: otherId,
      messages: chat.messages,
      key: key,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBar}
          // onChangeText={(term) => { this.searchUpdated(term) }}
          onClearText={this.onClearSearchText}
          placeholder='Search...'
        />

        <ScrollView>
            <FlatList
              data={this.state.chatList}
              renderItem={this.renderChat}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBar: {
    backgroundColor: Colors.background,
    fontSize: 15,
  },
});

export default ChatMain;
