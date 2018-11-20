import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const StoriesRoute = () => (
  <View style={styles.scene} />
);
const TreasuresRoute = () => (
  <View style={styles.scene} />
);

class Group extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'stories', title: 'Stories' },
      { key: 'treasures', title: 'Treasures' },
    ],
    groupName: 'Disney',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.groupName}
        </Text>

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
  scene: {
    flex: 1,
  },
})

export default Group;
