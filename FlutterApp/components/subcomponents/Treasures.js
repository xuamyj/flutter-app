import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasureCard from './TreasureCard';
import Search from './Search';

import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore'


class Treasures extends React.Component {
  state = {
    isModalVisible: false,
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  renderItem({item}) {
    return (
      <TreasureCard treasure={item} />
    )
  }


  render() {
    let treasureList = [];
    ItemListStore.items.forEach((item)=>{
      // if it belongs to a group that I am a part of
      if (item.state === "POSTED" && GroupListStore.getGroup(item.groupId).memberList.indexOf(UserStore.userId) !== -1){
        let giverObj = UserListStore.getUserObject(item.giver.id);
        treasureList.push({
          itemName: item.itemName,
          itemDescription: item.giver.itemDescription,
          itemPicUrl: item.giver.itemPicUrl,
          groupName: item.groupId,
          userName: giverObj.displayName,
          userPicUrl: giverObj.userPicUrl,
          key: item.itemId,
        })
      }
    })

    return (
      <View style={styles.container}>
        <Search />
        <FlatList
          style={styles.cardsContainer}
          data={treasureList}
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
})

export default view(Treasures);
