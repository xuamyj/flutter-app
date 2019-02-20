import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Icons from '../Themes/Icons';
import Modal from 'react-native-modal';
import RoundButtonSmall from '../subcomponents/RoundButtonSmall';
import GivePopupImage from '../subcomponents/GivePopupImage';
import GivePopupHeader from '../subcomponents/GivePopupHeader';
import GivePopupDescription from '../subcomponents/GivePopupDescription';
import GivePopupButtons from '../subcomponents/GivePopupButtons';
import GiveSelectFriendPopup from '../subcomponents/GiveSelectFriendPopup';
import { withNavigation } from 'react-navigation';

import { view } from 'react-easy-state';
import { UserStore, UserListStore, ChatListStore } from '../../GlobalStore';


const {height, width} = Dimensions.get('window');

class TreasurePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectFriendToggle: false,
      completionScreenViewed: false,
    }
  }

  _toggleModal = () => {
    this.props.toggle();
    if (this.state.selectFriendToggle === true) {
      this.onToggleSelectFriend();
    }
  }

  onPressMessage = () => {
    var chatObj = {
      myUserId: UserStore.userId,
      otherUserId: this.props.treasure.userId,
      otherUserName: UserListStore.getUserObject(this.props.treasure.userId).displayName,
      messages: [],
      key: UserStore.userId + "0" + this.props.treasure.userId,
    }

    var chatExists = false;
    ChatListStore.chats.forEach((chat) => {
      if (chatExists === false && chat.key === chatObj.key) {
        chatObj.messages = chat.messages;
        chatExists = true;
      }
    });
    if (chatExists === false) {
      ChatListStore.chats.push({
        key: chatObj.key,
        userIds: [chatObj.myUserId, chatObj.otherUserId],
        messages: chatObj.messages,
      });
    }

    this.props.navigation.navigate('Chat', { chat: chatObj, needUpdate: false });
    this._toggleModal();
  }

  onPressGive = (receiver) => {
    this.props.give(receiver);
  }

  onToggleSelectFriend = () => {
    this.setState({
      selectFriendToggle: !this.state.selectFriendToggle,
    });
  }

  onCompleteGive = (receiver) => {
    this._toggleModal();
    this.setState({
      completionScreenViewed: true,
    })
  }

  render() {
    var itemName = this.props.treasure.itemName;
    var groupName = this.props.treasure.groupName;
    var itemDescription = this.props.treasure.itemDescription;
    var userName = this.props.treasure.userName;
    var itemPicURL = this.props.treasure.itemPicUrl;
    var userPicUrl = this.props.treasure.userPicUrl;
    var userId = this.props.treasure.userId;
    var recvUserName = this.props.treasure.recvUserName;

    return  (
      <Modal isVisible={this.props.isVisible}
             onBackdropPress={this._toggleModal}>
        <View style={styles.card}>
        <GivePopupHeader
          itemName={itemName}
          groupName={groupName}
          toggle={this._toggleModal}/>
          {this.state.selectFriendToggle === false &&
            <View>
            <GivePopupImage
              itemPicURL={itemPicURL} />
            <GivePopupDescription
              isProfile={this.props.isProfile}
              itemDescription={itemDescription}
              userName={userName}
              userPicUrl={userPicUrl}/>
            <GivePopupButtons
              isProfile={this.props.isProfile}
              isActive={this.props.isActive}
              onPressMessage={this.onPressMessage}
              onToggleSelectFriend={this.onToggleSelectFriend}
              userName={userName}
              userId={userId}
              myUserId={UserStore.userId}
              recvUserName={recvUserName}
              />
            </View>
          }
          {this.state.selectFriendToggle === true && this.state.completionScreenViewed === false &&
            <GiveSelectFriendPopup
              isActive={true}
              onToggleSelectFriend={this.onToggleSelectFriend}
              onCompleteGive={this.onCompleteGive}
              onPressGive={this.onPressGive}
              toggle={this._toggleModal}
              itemPicURL={itemPicURL}
              />
          }
        </View>
      </Modal>
    );
  }

}

export default withNavigation(TreasurePopup);

const styles = StyleSheet.create({
  itemName: {
    fontSize: 20,
    color: Colors.dark,
    fontFamily: 'NunitoSemiBold',
    flex: 1,
    marginRight: Metrics.smallMargin,
  },
  groupName: {
    fontSize: 15,
    color: Colors.dark,
  },
  propic: {
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  username: {
    fontWeight: 'bold',
    color: Colors.dark,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Metrics.baseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 5,
    margin: Metrics.baseMargin,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,

  },
  cardTitleRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width * 9 / 16,
    resizeMode: 'cover',
  },
  badgeStyle: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    marginRight: Metrics.baseMargin * 1.5,
  },
  cardInfo: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
  },
  cardInfoText: {
    flex: 1,
  },
  button: {
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  }
})
