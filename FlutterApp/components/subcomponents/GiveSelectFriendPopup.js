import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button, ScrollView, FlatList } from 'react-native';
import { SearchBar, Avatar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Icons from '../Themes/Icons';
import Modal from 'react-native-modal';
import RoundButtonSmall from '../subcomponents/RoundButtonSmall';
import UserListItem from '../subcomponents/UserListItem';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { withNavigation } from 'react-navigation';

const {height, width} = Dimensions.get('window');

import Fire from '../../Fire';

class GiveSelectFriendPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      searchTerm: '',
      receiverId: "",
      recvObj: {},
      users: []
    }
  }

  componentDidMount() {
    let userList = [];
    Fire.shared.getAllUsers( userResult => {
      userList = [];
      userResult.forEach((user) => {
        if (user.key != Fire.shared.uid) {
          userList.push(this.createUserObj(user.key, user.val()))
        }
      });
      Promise.all(userList).then(() => {
        this.setState(previousState => ({
          users: userList,
        }))
      })
    })
  }

  onSelectFriend = (user) => {
    Fire.shared.getUser(user, userObj => {
      this.setState( previousState => ({
        receiverId: user,
        recvObj: userObj,
        step: this.state.step + 1,
      }))
    })
  }

  onIncrementStep = () => {
    this.setState({
      step: this.state.step + 1,
    })
  }

  onDecrementStep = () => {
    this.setState({
      step: this.state.step - 1,
    })
  }

  onPressGive = () => {
    this.onIncrementStep();
    this.props.onPressGive(this.state.receiverId);
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  createUserObj = (key, user) => {
    return {
      name: user.display_name,
      picUrl: user.profile_picture,
      key: key,
      subtitle: ''
    };
  }

  render() {
    var filteredUserList = this.state.users.filter(createFilter(this.state.searchTerm, ['name']));

    var recvUserName = this.state.recvObj.display_name;
    var recvPicUrl = this.state.recvObj.profile_picture;

    return  (
        <View>
        {this.state.step === 0 &&
          <View>
            <Text style={styles.directionsText}>Select a friend to give this item to.</Text>
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
            <View style={styles.listContainer}>
              <ScrollView>
                  {filteredUserList.map((user) =>
                    <UserListItem user={user} onPress={this.onSelectFriend}/>
                  )}
              </ScrollView>
            </View>
          </View>
        }
        {this.state.step === 1 &&
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Avatar large rounded source={{uri: this.props.itemPicURL}} />
              <Image style={styles.arrow} source={require('../../assets/gift_confirmation.png')} />
              <Avatar large rounded source={{uri: recvPicUrl}} />
            </View>
            <Text style={styles.confirmation}>Are you sure you want to give this item to <Text style={styles.bold}>{recvUserName}</Text>?</Text>
            <View style={styles.buttonContainer}>
              <RoundButtonSmall
                containerStyle={styles.doubleButton}
                label="GO BACK"
                backgroundColor={Colors.background}
                color={Colors.medium}
                size={14}
                onPress={this.onDecrementStep}
                isActive={this.props.isActive} />
              <RoundButtonSmall
                containerStyle={styles.doubleButton}
                label="GIVE!"
                backgroundColor={Colors.teal}
                color={'white'}
                size={14}
                onPress={this.onPressGive}
                isActive={this.props.isActive} />
            </View>
          </View>
        }
        {this.state.step === 2 &&
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Avatar large rounded source={{uri: this.props.itemPicURL}} />
              <Image style={styles.arrow} source={require('../../assets/gift_confirmed.png')} />
              <Avatar large rounded source={{uri: recvPicUrl}} />
            </View>
            <Text style={styles.confirmed}>This item has fluttered away! <Text style={styles.bold}>{recvUserName}</Text> will update you in a few days about their new adventures.</Text>
            <RoundButtonSmall
              containerStyle={styles.button}
              label="CLOSE"
              backgroundColor={Colors.teal}
              color={'white'}
              size={14}
              onPress={this.props.onCompleteGive}
              isActive={this.props.isActive} />
          </View>
        }
        </View>
    );
  }

}

export default withNavigation(GiveSelectFriendPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: Metrics.doubleBaseMargin,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  arrow: {
    maxWidth: '25%',
    height: '40%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  doubleButton: {
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    minWidth: '35%',
    width: '42%',
    maxWidth: width / 2.5,
    marginHorizontal: Metrics.smallMargin * 1.5,
  },
  button: {
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBar: {
    backgroundColor: Colors.background,
    fontSize: 15,
    width: (Metrics.screenWidth - 3 * Metrics.baseMargin) * 0.88,
  },
  searchBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: (Metrics.screenWidth - 3 * Metrics.baseMargin) * 0.88,
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth - 3 * Metrics.baseMargin,
  },
  listContainer: {
    height: height / 2.5,
  },
  directionsText: {
    fontSize: 15,
    color: Colors.dark,
    fontFamily: 'NunitoSemiBold',
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  bold: {
    fontWeight: 'bold',
  },
  confirmation: {
    fontSize: 24,
    marginHorizontal: Metrics.doubleBaseMargin * 2,
    marginVertical: Metrics.baseMargin * 1.5,
    textAlign: 'center',
  },
  confirmed: {
    fontSize: 18,
    marginHorizontal: Metrics.doubleBaseMargin * 2,
    marginVertical: Metrics.baseMargin * 1.5,
    textAlign: 'center',
  }
})
