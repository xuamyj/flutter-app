import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasurePopup from '../subcomponents/TreasurePopup';

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
            <Text style={styles.itemName} ellipsizeMode={'tail'} numberOfLines={1}>{itemName}</Text>
            <Badge textStyle={styles.groupName} value={groupName} containerStyle={styles.badgeStyle}/>
          </View>
          <View>
            <Image style={styles.image} source={{uri:itemPicURL}} />
          </View>
          <View style={styles.cardInfo}>
            <Avatar containerStyle={styles.propic} small rounded source={{uri: userPicUrl}} />
            <Text style={styles.username}>{userName}</Text>
          </View>

          <TreasurePopup isVisible={this.state.isModalVisible} toggle={this._toggleModal} treasure={this.props.treasure} />
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
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Metrics.baseMargin,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin * 1.25,
    width: width * 0.5 - Metrics.doubleBaseMargin * 1.5 - Metrics.smallMargin * 0.8
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
    color: Colors.dark,
    fontFamily: 'NunitoSemiBold',
    flex: 1,
    marginRight: Metrics.smallMargin,
  },
  groupName: {
    fontSize: 12,
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
    padding: Metrics.baseMargin,
    paddingTop: 2,
    paddingBottom: Metrics.smallMargin * 1.5,
  },
  propic: {
    marginRight: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * -1.5,
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  username: {
    fontWeight: 'bold',
    color: Colors.dark,
    fontSize: 12.5,
    marginLeft: -Metrics.smallMargin,
  },
})
