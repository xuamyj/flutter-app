import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasurePopup from '../subcomponents/TreasurePopup';

const {height, width} = Dimensions.get('window');

export default class TreasureCard extends React.Component {
  state = {
    isModalVisible: false,
    isProfile: this.props.isProfile,
    isActive: this.props.isActive,
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  giftObj() {
    this.props.onPressGive(this.props.treasure);
  }

  onPressGive = () => {
    this.giftObj();
    this.setState({
      isActive: !this.state.isActive,
      isModalVisible: !this.state.isModalVisible
    });
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
            <Image style={[styles.image,this.state.isProfile === true && styles.profileImages]} source={{uri:itemPicURL}} />
          </View>
          {this.state.isProfile === false &&
            <View style={styles.cardInfo}>
              <Avatar avatarStyle={styles.propicBorder} containerStyle={styles.propic} small rounded source={{uri: userPicUrl}} />
              <Text style={styles.username}>{userName}</Text>
            </View>
          }
          {this.state.isActive === false &&
            <View style={styles.givenOverlay}>
              <View style={styles.givenOverlayShadow} />
              <Text style={styles.givenOverlayText}>GIVEN</Text>
            </View>
          }

          <TreasurePopup
            isVisible={this.state.isModalVisible}
            toggle={this._toggleModal}
            give={this.onPressGive}
            treasure={this.props.treasure}
            isProfile={this.state.isProfile}
            isActive={this.state.isActive}/>
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
    marginHorizontal: Metrics.baseMargin * 0.75,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin * 1.25,
    width: width * 0.5 - Metrics.doubleBaseMargin * 1.5
  },
  image: {
    width: '100%',
    height: width * 9 / 32,
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
    fontSize: 13,
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
  propicBorder: {
    borderColor: 'white',
    borderWidth: 2.5,
  },
  propic: {
    marginRight: Metrics.baseMargin * 1.25,
    marginTop: Metrics.baseMargin * -1.5,
  },
  username: {
    fontWeight: 'bold',
    color: Colors.dark,
    fontSize: 13,
    marginLeft: -Metrics.smallMargin,
  },
  profileImages: {
    borderBottomLeftRadius: Metrics.baseMargin,
    borderBottomRightRadius: Metrics.baseMargin,
  },
  givenOverlay: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  givenOverlayShadow: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    opacity: 0.4,
    backgroundColor: Colors.background,
    width: '100%',
    height: '100%',
  },
  givenOverlayText: {
    fontSize: 18,
    color: Colors.lightText,
    textAlign: 'center',
    backgroundColor: Colors.buttonTint,
    letterSpacing: 1.25,
    fontFamily: 'NunitoSemiBold',
    paddingVertical: Metrics.smallMargin,
  }
})
