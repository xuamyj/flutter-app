import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasureCard from './TreasureCard';
import SearchInput, { createFilter } from 'react-native-search-filter';

import { withNavigation } from 'react-navigation';

import { view } from 'react-easy-state';
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore';

const KEYS_TO_FILTERS = ['itemName', 'itemDescription', 'groupName', 'userName'];

class Treasures extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  state = {
<<<<<<< HEAD
    isProfile: this.props.isProfile || false,
    update: true,
  }

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  renderItem = ({item}) => {
=======
    isModalVisible: false,
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderItem({item}) {
>>>>>>> 48c3fd45bd4a89c6d9161173cffb24545b45aed0
    return (
      <TreasureCard
        treasure={item}
        isProfile={this.state.isProfile}
        isActive={item.isActive}
        onPressGive={this.giveTreasure}/>
    )
  }

  createTreasureObj(item) {
    let giverObj = UserListStore.getUserObject(item.giver.id);

    return {
      itemName: item.itemName,
      itemDescription: item.giver.itemDescription,
      itemPicUrl: item.giver.itemPicUrl,
      groupName: item.groupId,
      userName: giverObj.displayName,
      userPicUrl: giverObj.userPicUrl,
      key: item.itemId,
      isActive: item.state === 'POSTED',
    }
  }

  changeObjectState = (key) => {
    ItemListStore.getItem(key).state = "GIVEN";
    ItemListStore.items = ItemListStore.items;
  }

  addObjectRecv = (key) => {
    ItemListStore.getItem(key).receiver = {id: '1', itemDescription: "", itemPicUrl: ""};
    ItemListStore.items = ItemListStore.items;
  }

  giveTreasure = (treasure) => {
    this.changeObjectState(treasure.key);
    this.addObjectRecv(treasure.key);
  }


  render() {
    let treasureList = [];
    ItemListStore.items.forEach((item)=>{
      let groupObj = GroupListStore.getGroup(item.groupId)

      // if it is a treasure
      if (item.state === "POSTED" || (this.state.isProfile === true && item.giver.id === '1')) {
        if (this.props.isHome) {
          treasureList.push(this.createTreasureObj(item))
        } else if (this.props.isGroup && groupObj.groupName === this.props.navigation.state.params.name) {
          treasureList.push(this.createTreasureObj(item))
        } else if (this.props.isProfile && item.giver.id === UserStore.userId) {
          treasureList.push(this.createTreasureObj(item))
        }
      }
    });

    filteredTreasureList = treasureList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

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
        <FlatList
          style={styles.cardsContainer}
          data={filteredTreasureList}
          renderItem={this.renderItem}
          numColumns={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  cardsContainer: {
    paddingHorizontal: Metrics.baseMargin * 1.5,
    marginBottom: Metrics.smallMargin,
  },
});

export default withNavigation(view(Treasures));
