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

import Fire from '../../Fire';

const {height, width} = Dimensions.get('window');

class TreasurePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectFriendToggle: false,
      completionScreenViewed: false,
      chats: [],
    }
  }

  componentDidMount() {
    chatList = [];
    this.callbackGetAllChats = Fire.shared.getAllChats(chatsResult => {
      chatsResult.forEach(chat => {
        chatList.push({key: chat.key, userIds: chat.val().userIds});
      })
      this.setState(previousState => ({
        chats: chatList,
      }))
    })
  }

  componentWillUnmount() {
    Fire.shared.offChats(this.callbackGetAllChats);
  }

  _toggleModal = () => {
    this.props.toggle();
    if (this.state.selectFriendToggle === true) {
      this.onToggleSelectFriend();
    }
  }

  onPressMessage = () => {

    var chatObj = {
      myUserId: Fire.shared.uid,
      otherUserId: this.props.treasure.userId,
      otherUserName: this.props.treasure.userName,
      key: "",
    }

    var chatExists = false;
    this.state.chats.forEach((chat) => {
      if (chatExists === false
          && chat.userIds.includes(chatObj.myUserId)
          && chat.userIds.includes(chatObj.otherUserId)) {
        chatObj.key = chat.key;
        chatExists = true;
      }
    });
    if (chatExists === false) {
      let chatKey = Fire.shared.writeChatData([chatObj.myUserId, chatObj.otherUserId]);
    }
    this.props.navigation.navigate('Chat', { chatKey: chatObj.key, otherName: chatObj.otherUserName, needUpdate: false });
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
              myUserId={Fire.shared.uid}
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
