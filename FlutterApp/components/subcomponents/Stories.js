import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Dimensions, Image, Animated, Alert } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import StoryCard from './StoryCard';

import SearchInput, { createFilter } from 'react-native-search-filter';
import { withNavigation } from 'react-navigation';

import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore'

const KEYS_TO_FILTERS = ['itemName', 'itemDescription', 'groupName', 'userName'];

const {height, width} = Dimensions.get('window');

class Stories extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  changeRecvDescription = ({description, index}) => {
    ItemListStore.items[index].receiver.itemDescription = description;
    ItemListStore.items = ItemListStore.items;
  }

  changeRecvImage = ({url, index}) => {
    ItemListStore.items[index].receiver.itemPicUrl = url;
    ItemListStore.items = ItemListStore.items;
  }

  onPressShareStory = (name, index) => {
    this.props.navigation.navigate('ShareStory', {name: name, index: index});
  }

  createStoryObj = (item) => {
    let giverObj = UserListStore.getUserObject(item.giver.id);
    let receiverObj = UserListStore.getUserObject(item.receiver.id);

    return {
      itemName: item.itemName,
      itemDescription: item.giver.itemDescription,
      itemPicUrl: item.giver.itemPicUrl,
      groupName: item.groupId,
      userName: giverObj.displayName,
      userPicUrl: giverObj.userPicUrl,
      key: item.itemId,
      state: item.state,

      giveItemDescription: item.giver.itemDescription,
      giveItemPicUrl: item.giver.itemPicUrl,
      giveUserName: giverObj.displayName,
      giveUserPicUrl: giverObj.userPicUrl,

      recvItemDescription: item.receiver.itemDescription,
      recvItemPicUrl: item.receiver.itemPicUrl,
      recvUserName: receiverObj.displayName,
      recvUserPicUrl: receiverObj.userPicUrl,
    };
  }

  isTreasure = (item) => {
    return item.state === "POSTED";
  }

  isMineGiven = (item) => {
    return item.giver.id === UserStore.userId;
  }
  isMineReceived = (item) => {
    return item.receiver.id === UserStore.userId;
  }

  render() {
    let storiesList = [];
    ItemListStore.items.forEach((item)=>{
      // if it belongs to a group that I am a part of
      let groupObj = GroupListStore.getGroup(item.groupId)

      if (!this.isTreasure(item)){
        if (this.props.isHome && item.state === "COMPLETE") {
          storiesList.push(this.createStoryObj(item));
        } else if (this.props.isGroup
          && item.state === "COMPLETE"
          && groupObj.groupId === this.props.navigation.state.params.group.groupId) {
          storiesList.push(this.createStoryObj(item));
        } else if ((this.props.isMineGiven && this.isMineGiven(item))
          || (this.props.isMineReceived && this.isMineReceived(item))) {
          storiesList.push(this.createStoryObj(item));
        }
      }
    })

    filteredStoriesList = storiesList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
          <SearchBar
          round
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBar}
          onChangeText={(term) => { this.searchUpdated(term) }}
          placeholder='Search...'
        />

        <ScrollView>
          {
            filteredStoriesList.map((l, i) => (
              <StoryCard story={l}
                key={l.key}
                myName={UserStore.userName}
                index={i}
                changeRecvDescription={this.changeRecvDescription}
                changeRecvImage={this.changeRecvImage}
                onPressShareStory={this.onPressShareStory}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  group: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  caption: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
  },
  captiontext: {
    margin: 5,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: Metrics.doubleBaseMargin,
    borderColor: Colors.border,
    borderWidth: Metrics.borderWidth,
    margin: Metrics.baseMargin,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.screenWidth * 1.05,
    resizeMode: 'contain',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleheader: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  groupheader: {
    fontSize: 24,
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
  smallImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
  },
})

export default withNavigation(view(Stories));
