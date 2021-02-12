import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Avatar, Badge} from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import Icons from '../Themes/Icons';
import Modal from 'react-native-modal';
import RoundButtonSmall from '../subcomponents/RoundButtonSmall';
import { withNavigation } from 'react-navigation';


const {height, width} = Dimensions.get('window');

class GivePopupImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var itemPicURL = this.props.itemPicURL;

    return  (
       <View>
         <Image style={styles.image} source={{uri:itemPicURL}} />
       </View>
    );
  }

}

export default withNavigation(GivePopupImage);

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
