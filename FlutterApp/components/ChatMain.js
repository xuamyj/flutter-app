import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import ChatItem from './subcomponents/ChatItem';
import Search from './subcomponents/Search';

class ChatMain extends React.Component {
  state = {
    chatList: [
      {
        name: 'Cynthia',
        picUrl: 'https://i.imgur.com/z7fgB60.jpg',
        key: '11221212',
        subtitle: 'Cynthia: let\'s meet by the pond'
      },
      {
        name: 'Belle',
        picUrl: 'https://vignette.wikia.nocookie.net/disneyheroines/images/7/7c/Belle.jpg',
        key: '33488788',
        subtitle: 'You: Okay, see you in a bit!'
      },
    ]
  };

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  onPressNewChat = () => {
    this.props.navigation.navigate('Chat', { name: 'TODO fix chat' });
  }

  onPressChat = (name) => {
    this.props.navigation.navigate('Chat', { name: name });
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

  renderChat = ({ item }) => (
    <TouchableOpacity onPress={() => {this.onPressChat(item.name)}}>
      <ChatItem chat={item} />
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>

      <Search />

      <ScrollView>
        {
          <FlatList
            data={this.state.chatList}
            renderItem={this.renderChat}
          />
        }
      </ScrollView>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatMain;
