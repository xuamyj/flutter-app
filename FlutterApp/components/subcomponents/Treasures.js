import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasureCard from './TreasureCard';
import SearchInput, { createFilter } from 'react-native-search-filter';
import ModalFilterPicker from 'react-native-modal-filter-picker'

import { withNavigation } from 'react-navigation';

import Fire from '../../Fire';

const KEYS_TO_FILTERS = ['itemName', 'itemDescription', 'userName', 'recvItemDescription'];
const GROUP_KEYS_TO_FILTERS = ['groupName']

class Treasures extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      groupFilterModal: false,
      searchTerm: '',
      picked: '',
      isProfile: this.props.isProfile || false,
      treasures: [],
      filteredTreasures: [],
      options: [],
    }
  }

  searchUpdated(term) {
    this.updateFilter(term, this.state.picked);
  }

  onShow = () => {
    this.setState({ groupFilterModal: true });
  }

  onSelect = (picked) => {
    this.updateFilter(this.state.searchTerm, picked);
  }

  onCancel = () => {
    this.updateFilter(this.state.searchTerm, '');
  }

  updateFilter(searchTerm, picked) {
    let filteredTreasures = this.state.treasures.filter(createFilter(picked, GROUP_KEYS_TO_FILTERS));
    filteredTreasures = filteredTreasures.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
    this.setState({
      filteredTreasures: filteredTreasures,
      searchTerm: searchTerm,
      picked: picked,
      groupFilterModal: false,
    })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderItem = ({item}) => {
    return (
      <TreasureCard
        treasure={item}
        isProfile={this.state.isProfile}
        isActive={item.isActive}
        onPressGive={this.giveTreasure}/>
    )
  }

  createTreasureObj(item, groupObj, giverObj, recvObj) {
    return {
      itemName: item.itemName,
      itemDescription: item.giver.itemDescription,
      itemPicUrl: item.giver.itemPicUrl,
      groupName: groupObj.groupName,
      groupId: item.groupId,
      userName: giverObj.display_name,
      userId: item.giver.id,
      userPicUrl: giverObj.profile_picture,
      isActive: item.state === 'POSTED',
      timestamp: item.timestamp,
      recvUserName: recvObj.display_name,
    }
  }

  changeObjectState = (key) => {
    firebase.database().ref('posts/' + key).update({
      state : "GIVEN",
    })
  }

  addObjectRecv = (key, receiver) => {
    firebase.database().ref('posts/' + key).update({
      receiver : {
        id: receiver,
        itemDescription: "",
        itemPicUrl: ""
      },
    })
  }

  giveTreasure = (treasure,receiver) => {
    this.changeObjectState(treasure.key);
    this.addObjectRecv(treasure.key, receiver);
  }

  componentDidMount() {
    let itemList = [];
    this.callbackGetAllItems = Fire.shared.getAllItems(itemResult => {
      itemResult.forEach((item) => {
        itemObj = item.val();
        itemList.push(itemObj);
      });
      Promise.all(itemList).then(() => {
        let treasureList = [];
        itemList.forEach((itemObj) => {
          Fire.shared.getGroup(itemObj.groupId, groupObj => {
            Fire.shared.getUser(itemObj.giver.id, giverObj => {
              Fire.shared.getUser(itemObj.receiver.id, receiverObj => {
                if (this.props.isHome && itemObj.state === "POSTED") {
                  treasureList.push(this.createTreasureObj(itemObj, groupObj, giverObj, receiverObj))
                } else if (this.props.isGroup
                  && itemObj.groupId === this.props.navigation.state.params.groupId
                  && itemObj.state === "POSTED") {
                  treasureList.push(this.createTreasureObj(itemObj, groupObj, giverObj, receiverObj))
                } else if (this.props.isProfile && itemObj.giver.id === Fire.shared.uid) {
                  treasureList.push(this.createTreasureObj(itemObj, groupObj, giverObj, receiverObj))
                }
                treasureList = this.sortByTime(treasureList);
                let options = [];
                Fire.shared.getAllGroups(groupResult => {
                  groupResult.forEach((group)=>{
                    key = group.val().groupName;
                    label = group.val().groupName;
                    options.push({key, label});
                  });
                });
                this.setState( previousState => ({
                  treasures: treasureList,
                  filteredTreasures: treasureList,
                  options: options
                }));
              })
            })
          })
        });
      })
    })
  }

  componentWillUnmount() {
    Fire.shared.offItems(this.callbackGetAllItems);
  }

  sortByTime(list) {
    return list.sort(function(a, b) {
      let x = a.timestamp;
      let y = b.timestamp;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    })
  }

  render() {
    const { groupFilterModal, picked } = this.state;

    return (
      <View style={styles.container}>
        <ModalFilterPicker
              visible={groupFilterModal}
              onSelect={this.onSelect}
              onCancel={this.onCancel}
              options={this.state.options}
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
        <FlatList
          style={styles.cardsContainer}
          data={this.state.filteredTreasures}
          renderItem={this.renderItem}
          numColumns={2}
          extraData={this.state} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.doubleBaseMargin * 2,
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

export default withNavigation(Treasures);
