import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import ChatItem from './subcomponents/ChatItem';
import Search from './subcomponents/Search';
import SearchInput, { createFilter } from 'react-native-search-filter';

import { view } from 'react-easy-state';
import { UserStore, UserListStore, ChatListStore } from '../GlobalStore';

class ChatMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      searchTerm: '',
    }
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this.updateChatList();
    });
  }

  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }

  onPressChat = (chat) => {
    this.props.navigation.navigate('Chat', { chat: chat, updateChatList: this.updateChatList, toProfile: this.onPressGive });
  }

  onPressGive = () => {
    this.props.navigation.navigate('PROFILE');
  }

  updateChatList = () => {
    let userId = UserStore.userId;
    let chatList = [];
    ChatListStore.chats.forEach((chat)=>{
      if (chat.messages.length > 0) {
        // if it is user's chats
        if (chat.userIds[0] == userId) {
          chatList.push(this.createChatObject(chat.key, userId, chat.userIds[1]))
        } else if (chat.userIds[1] == userId) {
          chatList.push(this.createChatObject(chat.key, userId, chat.userIds[0]));
        }
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
      otherUserName: UserListStore.getUserObject(otherId).displayName,
      messages: chat.messages,
      key: key,
    }
  }

  render() {

    var filteredChatList = this.state.chatList.filter(createFilter(this.state.searchTerm, ['otherUserName']));

    return (
      <View style={styles.container}>
        <Search searchUpdated={this.searchUpdated}/>
        <ScrollView>
            <FlatList
              data={filteredChatList}
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
