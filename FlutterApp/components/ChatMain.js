import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';

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

  onPressChat = () => {
    this.props.navigation.navigate('Chat', { name: 'TODO fix chat' });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressNewChat}>
          <Icon
            name='message'
            color='#49B6BB'
          />
        </TouchableOpacity>

        <Text>
          Chats
        </Text>

        <SearchBar
          lightTheme
          onChangeText={this.onChangeSearchText}
          onClearText={this.onClearSearchText}
          placeholder='Search chats...'
        />

        <List containerStyle={styles.chatList}>
          {
            this.state.chatList.map((l) => (
              <ListItem
                roundAvatar
                key={l.key}
                title={l.name}
                subtitle={l.subtitle}
                avatar={{uri:l.picUrl}}
                onPress={this.onPressChat}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatList: {
    marginBottom: 20,
  }
});

export default ChatMain;
