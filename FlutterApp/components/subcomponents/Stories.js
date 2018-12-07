import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Dimensions, Image, Animated, Alert } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import StoryCard from './StoryCard';
import Search from './Search';

import { view } from 'react-easy-state'
import { ItemListStore, UserStore, UserListStore, GroupListStore } from '../../GlobalStore'

const {height, width} = Dimensions.get('window');

class Stories extends React.Component {


  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  changeRecvDescription = ({description, index}) => {
    ItemListStore.items[index].receiver.itemDescription = description;
    ItemListStore.items = ItemListStore.items;
  }

  changeRecvImage = ({url, index}) => {
    ItemListStore.items[index].receiver.itemPicUrl = url;
    ItemListStore.items = ItemListStore.items;
  }

  onPressShareStory = (text, newImage, index) => {
    this.changeRecvDescription({description: text, index: index})
    this.changeRecvImage({url:newImage, index: index})

    Alert.alert(
      'Story shared!',
      ('You have shared ' + text + '!'),
      [
        {text: 'OK'},
      ],
    );

  }

  render() {
    let treasureList = [];
    ItemListStore.items.forEach((item)=>{
      // if it belongs to a group that I am a part of
      let groupObj = GroupListStore.getGroup(item.groupId)
      if (item.state !== "POSTED"
        && groupObj.memberList.indexOf(UserStore.userId) !== -1){
        let giverObj = UserListStore.getUserObject(item.giver.id);
        let receiverObj = UserListStore.getUserObject(item.receiver.id);
        treasureList.push({
          itemName: item.itemName,
          itemDescription: item.giver.itemDescription,
          itemPicUrl: item.giver.itemPicUrl,
          groupName: item.groupId,
          userName: giverObj.displayName,
          userPicUrl: giverObj.userPicUrl,
          key: item.itemId,

          giveItemDescription: item.giver.itemDescription,
          giveItemPicUrl: item.giver.itemPicUrl,
          giveUserName: giverObj.displayName,
          giveUserPicUrl: giverObj.userPicUrl,

          recvItemDescription: item.receiver.itemDescription,
          recvItemPicUrl: item.receiver.itemPicUrl,
          recvUserName: receiverObj.displayName,
          recvUserPicUrl: receiverObj.userPicUrl,
        })
      }
    })

    return (
      <View style={styles.container}>
        <Search />

        <ScrollView>
          {
            treasureList.map((l, i) => (
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
    marginBottom: 50,
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

export default view(Stories);
