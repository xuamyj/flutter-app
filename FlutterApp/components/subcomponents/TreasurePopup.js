import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Icons from '../Themes/Icons';
import Modal from 'react-native-modal';

const {height, width} = Dimensions.get('window');

export default class TreasurePopup extends React.Component {

  constructor(props) {
    super(props);
  }

  _toggleModal = () => {
    this.props.toggle();
  }

  render() {
    var itemName = this.props.treasure.itemName;
    var groupName = this.props.treasure.groupName;
    var itemDescription = this.props.treasure.itemDescription;
    var userName = this.props.treasure.userName;
    var itemPicURL = this.props.treasure.itemPicUrl;
    var userPicUrl = this.props.treasure.userPicUrl;

    return  (
      <Modal isVisible={this.props.isVisible}
             onBackdropPress={this._toggleModal}>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.itemName} ellipsizeMode={'tail'} numberOfLines={1}>{itemName}</Text>
            <View style={styles.cardTitleRight}>
              <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.badgeStyle}/>
              <TouchableOpacity onPress={this._toggleModal}>
                <Icons iconName={"cross"} size={18}/>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image style={styles.image} source={{uri:itemPicURL}} />
          </View>
          <View style={styles.cardInfo}>
            <Avatar containerStyle={styles.propic} medium rounded source={{uri: userPicUrl}} />
            <View style={styles.cardInfoText} ellipsizeMode={'tail'} numberOfLines={1}>
              <Text><Text style={styles.username}>{userName} </Text>{itemDescription}</Text>
            </View>
          </View>
          <Button
            onPress={this._toggleModal}
            title="I want this!"
            color="#49B6BB"
          />
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  itemName: {
    fontSize: 20,
    color: Colors.dark,
    fontFamily: 'NunitoSemiBold',
    flex: 1,
    marginRight: Metrics.smallMargin,
  },
  groupName: {
    fontSize: 14.5,
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
    height: 300,
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
  }
})
