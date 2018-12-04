import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Stories from './subcomponents/Stories';
import Treasures from './subcomponents/Treasures';
import Logo from './subcomponents/Logo'

const StoriesRoute = () => (
  <Stories />
);
const TreasuresRoute = () => (
  <Treasures />
);

class HomeMain extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'stories', title: 'Stories' },
      { key: 'treasures', title: 'Treasures' },
    ],
  };

  static navigationOptions = {
    headerTitle: <Logo />,
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            stories: StoriesRoute,
            treasures: TreasuresRoute
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
  logo: {
    width: 110,
    height: 60,
  },
  scene: {
    flex: 1,
  },
})

export default HomeMain;
