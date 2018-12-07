import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Metrics, Colors } from './Themes';

import { view } from 'react-easy-state'
import { UserStore } from '../GlobalStore'

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
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('userName'),
      headerStyle: {backgroundColor: Colors.background, borderBottomWidth: 0, elevation: 0},
      headerTitleStyle: {
        fontFamily: 'NunitoBold',
        fontWeight: '200',
      },
      headerRight: (
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={navigation.getParam('onPressSettings')}>
            <Icon
              name='settings'
              color='#49B6BB'
              />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({userName: UserStore.userName})
    this.props.navigation.setParams({ onPressSettings: this.onPressSettings });
  }

  state = {
    index: 0,
    routes: [
      { key: 'given', title: 'Given' },
      { key: 'received', title: 'Received' },
      { key: 'posted', title: 'Posted' },
    ],
  };

  onPressSettings = () => {
    this.props.navigation.navigate('Settings', {});
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.topSection}>
            <Avatar
            large
            rounded
            source={{uri: UserStore.userPicUrl}}
            style={styles.icon}
            />
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
              labelStyle={{fontSize: 14, color: Colors.dark}}
              style={{backgroundColor: Colors.background}}
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
  topSection:{
    flexDirection: 'column',
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  headerButton:{
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
  icon: {
    resizeMode: 'contain',
  },
  scene: {
    flex: 1,
  },
});

export default view(ProfileMain);
