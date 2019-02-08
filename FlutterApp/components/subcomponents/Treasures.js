import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasureCard from './TreasureCard';
import SearchInput, { createFilter } from 'react-native-search-filter';
import ModalFilterPicker from 'react-native-modal-filter-picker'

import { withNavigation } from 'react-navigation';

import { view } from 'react-easy-state';
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore';

const KEYS_TO_FILTERS = ['itemName', 'itemDescription', 'userName', 'recvItemDescription'];
const GROUP_KEYS_TO_FILTERS = ['groupName']

class Treasures extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      groupFilterModal: false,
      searchTerm: '',
      picked: '',
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  state = {
    groupFilterModal: false,
  };

  onShow = () => {
    this.setState({ isModalVisible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      groupFilterModal: false
    })
  }

  onCancel = () => {
    this.setState({
      groupFilterModal: false
    });
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderItem({item}) {
    return (
      <TreasureCard treasure={item} isProfile={false} />
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
    }
  }


  render() {
    const { groupFilterModal, picked } = this.state;

    let treasureList = [];
    ItemListStore.items.forEach((item)=>{
      let groupObj = GroupListStore.getGroup(item.groupId)

      // if it is a treasure
      if (item.state === "POSTED") {
        if (this.props.isHome) {
          treasureList.push(this.createTreasureObj(item))
        } else if (this.props.isGroup && groupObj.groupName === this.props.navigation.state.params.name) {
          treasureList.push(this.createTreasureObj(item))
        } else if (this.props.isProfile && item.giver.id === UserStore.userId) {
          treasureList.push(this.createTreasureObj(item))
        }
      }
    });

    let options = [];
    GroupListStore.groups.forEach((group)=>{
      key = group.groupName;
      label = group.groupName;
      options.push({key, label});
    });

    filteredTreasureList = treasureList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    filteredStoriesList = filteredStoriesList.filter(createFilter(this.state.picked, GROUP_KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
        <ModalFilterPicker
              visible={groupFilterModal}
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
            />
          </View>
          <TouchableOpacity onPress={this.onShow}>
              <Image
              style={styles.button}
              source={require("../../assets/filter.png")}
              /> 
          </TouchableOpacity>
        </View>
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
  button: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
});

export default withNavigation(view(Treasures));
