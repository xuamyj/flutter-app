import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

export default class TreasureCard extends React.Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .97
    }).start();

  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 1000,
      tension: 40,
    }).start();
  }

  open = () => {
  }

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    }
    var itemName = this.props.treasure.itemName;
    var groupName = this.props.treasure.groupName;
    var itemDescription = this.props.treasure.itemDescription;
    var userName = this.props.treasure.userName;
    var itemPicURL = this.props.treasure.itemPicUrl;
    var userPicUrl = this.props.treasure.userPicUrl;

    return  (

      <TouchableWithoutFeedback onPress={this._toggleModal} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>

        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.cardTitle}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.badgeStyle}/>
          </View>
          <View>
            <Image style={styles.image} source={{uri:itemPicURL}} />
          </View>
          <View style={styles.cardInfo}>
            <Avatar containerStyle={styles.propic} small rounded source={{uri: userPicUrl}} />
            <Text style={styles.username}>{userName}</Text>
          </View>

          <Modal isVisible={this.state.isModalVisible}
                 onBackdropPress={this._toggleModal}>
            <View style={styles.modalCard}>
              <View style={styles.modalCardTitle}>
                <Text style={styles.itemName}>{itemName}</Text>
                <View style={styles.modalCardTitleRight}>
                  <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.modalBadgeStyle}/>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <FontAwesome name="times"
                    size={Metrics.icons.medium}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Image style={styles.modalImage} source={{uri:itemPicURL}} />
              </View>
              <View style={styles.modalCardInfo}>
                <Avatar containerStyle={styles.propic} small rounded source={{uri: userPicUrl}} />
                <View style={styles.modalCardInfoText}>
                  <Text><Text style={styles.username}>{userName}: </Text>{itemDescription}</Text>
                </View>
              </View>
              <Button
                onPress={this._toggleModal}
                title="Hit me up!"
                color="#49B6BB"
              />
            </View>
          </Modal>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Metrics.baseMargin * 0.75,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    margin: Metrics.smallMargin,
    width: width * 0.5 - Metrics.smallMargin * 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark,
  },
  groupName: {
    fontSize: 15,
    color: Colors.dark,
  },
  badgeStyle: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  propic: {
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  username: {
    fontWeight: 'bold',
    color: Colors.dark,
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: Metrics.baseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 5,
    margin: Metrics.baseMargin,
  },
  modalCardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,

  },
  modalCardTitleRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  modalBadgeStyle: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    marginRight: 10,
  },
  modalCardInfo: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  modalCardInfoText: {
    width: width * 0.7,
  }
})
