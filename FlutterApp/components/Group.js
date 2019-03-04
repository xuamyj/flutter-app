import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';

import Stories from './subcomponents/Stories'
import Treasures from './subcomponents/Treasures'

const StoriesRoute = () => (
  <Stories isGroup />
);
const TreasuresRoute = () => (
  <Treasures isGroup />
);

class Group extends React.Component {

    state = {
      index: 0,
      routes: [
        { key: 'stories', title: 'Stories' },
        { key: 'treasures', title: 'Treasures' },
      ],
      groupName:"",
    };

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).groupName || 'Group!',
    headerStyle: {backgroundColor: Colors.background, borderBottomWidth: 0, elevation: 0},
    headerTitleStyle: {
      fontFamily: 'NunitoBold',
      fontWeight: '200',
      color: Colors.dark,
    },
    headerRight: (
      <View style={styles.headerButton}>
        <TouchableOpacity onPress={navigation.getParam("onPressGroupSettings")}>
          <Icon
            name='settings'
            color='#49B6BB'
            />
        </TouchableOpacity>
      </View>
    ),
    headerBackTitle: null,
    headerTintColor: Colors.teal,
  });

  onPressGroupSettings = () => {
    this.props.navigation.navigate('GroupSettings', {groupId: this.props.navigation.state.params.groupId});
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPressGroupSettings: this.onPressGroupSettings });

  }

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
              labelStyle={{color: Colors.dark}}
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
  },
  scene: {
    flex: 1,
  },
  headerButton:{
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
})

export default Group;
