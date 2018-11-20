import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressSettings}>
          <Icon
            name='settings'
            color='#49B6BB'
          />
        </TouchableOpacity>

        <Avatar
          medium
          rounded
          source={{uri: this.state.userPicUrl}}
          activeOpacity={0.7}
        />
        <Text>
          {this.state.userName}
        </Text>

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
  },
  scene: {
    flex: 1,
  },
});

export default ProfileMain;
