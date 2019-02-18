import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Icons from '../Themes/Icons';
import Modal from 'react-native-modal';
import RoundButtonSmall from '../subcomponents/RoundButtonSmall';
import { withNavigation } from 'react-navigation';

const {height, width} = Dimensions.get('window');

class GivePopupButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  onToggleSelectFriend = () => {
    this.props.onToggleSelectFriend();
  }

  render() {
    var itemName = this.props.itemName;
    var groupName = this.props.groupName;
    var itemDescription = this.props.itemDescription;
    var userName = this.props.userName;
    var itemPicURL = this.props.itemPicUrl;
    var userPicUrl = this.props.userPicUrl;

    return  (
      <View>
      {this.props.isProfile === true &&
        <View style={styles.buttonContainer}>
          {this.props.isActive === true &&
            <RoundButtonSmall
              containerStyle={styles.button}
              label="GIVE!"
              backgroundColor={Colors.teal}
              color={'white'}
              size={14}
              onPress={this.onToggleSelectFriend}
              isActive={this.props.isActive} />
          }
          {this.props.isActive === false &&
            <RoundButtonSmall
              containerStyle={styles.button}
              label={"GIVEN TO " + userName.toUpperCase()}
              backgroundColor={Colors.background}
              color={Colors.lightText}
              size={14}
              isActive={this.props.isActive} />
          }
        </View>
      }
      {this.props.isProfile === false &&
          <View style={styles.buttonContainer}>
            {this.props.isActive === true &&
              <RoundButtonSmall
                containerStyle={styles.button}
                label={"MESSAGE " + userName.toUpperCase()}
                backgroundColor={Colors.teal}
                color={'white'}
                size={14}
                onPress={this.onPressMessage}
                isActive={this.props.isActive} />
            }
            {this.props.isActive === false &&
              <RoundButtonSmall
                containerStyle={styles.button}
                label="ALREADY GIVEN"
                backgroundColor={Colors.background}
                color={Colors.lightText}
                size={14}
                isActive={this.props.isActive} />
            }
          </View>
      }
      </View>
    );
  }

}

export default withNavigation(GivePopupButtons);

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
