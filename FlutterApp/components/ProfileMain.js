import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap
} from 'react-native-tab-view';

import firebase from 'firebase';

const GivenRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#F8C1D8' }]} />
);
const ReceivedRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#CFCB9C' }]} />
);
const PostedRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#B6DCE2' }]} />
);

class ProfileMain extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'given', title: 'Given' },
      { key: 'received', title: 'Received' },
      { key: 'posted', title: 'Posted' },
    ],
  };

  onPress = () => {
    this.props.navigation.navigate('Settings', {});
  }

  render() {
    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            given: GivenRoute,
            received: ReceivedRoute,
            posted: PostedRoute
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default ProfileMain;
