import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Dimensions, Image, Animated, Alert, TouchableOpacity } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import StoryCard from './StoryCard';

import SearchInput, { createFilter } from 'react-native-search-filter';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import ModalFilterPicker from 'react-native-modal-filter-picker'

import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore'

const KEYS_TO_FILTERS = ['itemName', 'itemDescription', 'userName', 'recvItemDescription'];
const GROUP_KEYS_TO_FILTERS = ['groupName']

const {height, width} = Dimensions.get('window');

class Stories extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      searchTerm: '',
      picked: '',
      isProfile: this.props.isProfile,
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

  onShow = () => {
    this.setState({ isModalVisible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      isModalVisible: false
    })
  }

  onCancel = () => {
    this.setState({
      picked: '',
      isModalVisible: false
    });
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
      giveUserId: giverObj.userId,

      recvItemDescription: item.receiver.itemDescription,
      recvItemPicUrl: item.receiver.itemPicUrl,
      recvUserName: receiverObj.displayName,
      recvUserPicUrl: receiverObj.userPicUrl,
      recvUserId: receiverObj.userId,
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
    const { isModalVisible, picked } = this.state;

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

    let options = [];
    GroupListStore.groups.forEach((group)=>{
      key = group.groupName;
      label = group.groupName;
      options.push({key, label});
    });

    filteredStoriesList = storiesList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    filteredStoriesList = filteredStoriesList.filter(createFilter(this.state.picked, GROUP_KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
        <ModalFilterPicker
          visible={isModalVisible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
          placeholderText="Filter by group..."
        />
        <View style={styles.searchView}>
          <View style={styles.searchBarView}>
            <SearchBar
              round
              lightTheme
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBar}
              onChangeText={(term) => { this.searchUpdated(term) }}
              placeholder='Search...'
              clearIcon
            />
          </View>
          <TouchableOpacity onPress={this.onShow}>
              <Image
              style={styles.button}
              source={require("../../assets/filter.png")}
              />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            filteredStoriesList.map((l, i) => (
              <StoryCard story={l}
                key={l.key}
                myId={UserStore.userId}
                index={i}
                changeRecvDescription={this.changeRecvDescription}
                changeRecvImage={this.changeRecvImage}
                onPressShareStory={this.onPressShareStory}
                isProfile={this.state.isProfile}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.doubleBaseMargin * 2,
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
    fontWeight: 'bold',
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
    width: Metrics.screenWidth * 0.88,
  },
  searchBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth * 0.88,
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth,
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
  button: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
})

export default withNavigation(view(Stories));
