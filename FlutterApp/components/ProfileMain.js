import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Metrics, Colors } from './Themes';

import firebase from 'firebase';

const GivenRoute = () => (
  <View style={styles.scene} />
);
const ReceivedRoute = () => (
  <View style={styles.scene} />
);
const PostedRoute = () => (
  <View style={styles.scene} />
);

class ProfileMain extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'given', title: 'Given' },
      { key: 'received', title: 'Received' },
      { key: 'posted', title: 'Posted' },
    ],
    userName: 'Amy',
    userPicUrl: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
  };

  onPressSettings = () => {
    this.props.navigation.navigate('Settings', {});
  }

  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.topSection}>
          </View>
          <View style={styles.topSection}>
            <Avatar
            medium
            rounded
            source={{uri: this.state.userPicUrl}}
            activeOpacity={0.7}
            style={styles.icon}
            />
            <Text>
              {this.state.userName}
            </Text>
          </View>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={this.onPressSettings}>
            <Icon
              name='settings'
              color='#49B6BB'
            />
          </TouchableOpacity>
          </View>
        </View>

        

        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            given: GivenRoute,
            received: ReceivedRoute,
            posted: PostedRoute
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{width: Dimensions.get('window').width}}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: '#49B6BB'}}
              labelStyle={{color: 'gray'}}
              style={{backgroundColor: 'white'}}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    flex: 0.15,
    flexDirection: 'row',
    height: 10,
    justifyContent: 'space-between',
  },
  topSection:{
    flex: 0.3,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  scene: {
    flex: 1,
  },
});

export default ProfileMain;
