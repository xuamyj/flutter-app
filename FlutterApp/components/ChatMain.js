import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import ChatItem from './subcomponents/ChatItem';
import Search from './subcomponents/Search';
import SearchInput, { createFilter } from 'react-native-search-filter';

import Fire from '../Fire';

class ChatMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      filteredChatList: [],
      searchTerm: '',
    }
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this.updateChatList();
    });
  }

  searchUpdated = (term) => {
    var filteredChatList = this.state.chatList.filter(createFilter(this.state.searchTerm, ['otherUserName']));
    this.setState({
      searchTerm: term,
      filteredChatList: filteredChatList,
    });
  }

  onPressChat = (chat) => {
    this.props.navigation.navigate('Chat', { chatKey: chat.key, otherName: chat.otherUserName, updateChatList: this.updateChatList });
  }

  updateChatList = () => {
    let userId = Fire.shared.uid;

    Fire.shared.getAllChats((chatsResult) => {
      let chatList = [];
      chatsResult.forEach((chatObj) => {
        let key = chatObj.key;
        let chat = chatObj.val();
        if (chat.messages != undefined) {
          // if it is user's chats
          if (chat.userIds[0] === userId) {
            Fire.shared.getUser(chat.userIds[1], otherUser => {
              chatList.push(this.createChatObject(chat, key, chat.userIds[1], otherUser));
              chatList = this.sortByTime(chatList)
              this.setState(previousState => ({
                chatList: chatList,
                filteredChatList: chatList,
              }));
            })
          } else if (chat.userIds[1] === userId) {
            Fire.shared.getUser(chat.userIds[0], otherUser => {
              chatList.push(this.createChatObject(chat, key, chat.userIds[0], otherUser));
              chatList = this.sortByTime(chatList)
              this.setState(previousState => ({
                chatList: chatList,
                filteredChatList: chatList,
              }));
            })
          }
        }
      })

    })
  }

  sortByTime(list) {
    return list.sort(function(a, b) {
      let x = a.timestamp;
      let y = b.timestamp;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    })
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
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onPressChat(item)}>
        <ChatItem chat={item}/>
      </TouchableOpacity>
    )
  }

  createChatObject(chat, chatKey, otherUserId, otherUser) {
    let messages = [];
    for (var key in chat.messages) {
      var message = chat.messages[key];
      messages.unshift(message);
    }
    return {
      myUserId: Fire.shared.uid,
      otherUserId: otherUserId,
      otherUserName: otherUser.display_name,
      otherUserPicUrl: otherUser.profile_picture,
      messages: messages,
      key: chatKey,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Search searchUpdated={this.searchUpdated}/>
        <ScrollView>
            <FlatList
              data={this.state.filteredChatList}
              renderItem={this.renderChat}
              extraData={this.state}
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
