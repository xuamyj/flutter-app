import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import Search from './subcomponents/Search';
import GroupItem from './subcomponents/GroupItem';
import SearchInput, { createFilter } from 'react-native-search-filter';

import { view } from 'react-easy-state'
import { UserStore, UserListStore, GroupListStore } from '../GlobalStore'


class GroupsMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Groups',
      headerStyle: {backgroundColor: Colors.background},
      headerRight: (
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={navigation.getParam("onPressCreateGroup")}>
            <Icon
              name='group-add'
              color='#49B6BB'
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        fontFamily: 'NunitoBold',
        fontWeight: '200',
        color: Colors.dark,
      },
      headerBackTitle: null,
      headerTintColor: Colors.teal,
    };
  };

  callbackGetAllGroups = null;

  componentDidMount() {
    this.props.navigation.setParams({ onPressCreateGroup: this.onPressCreateGroup });
  }

  onPressCreateGroup = () => {
    this.props.navigation.navigate('GroupCreate', {});
  }

  onPressGroup = (id) => {
    this.props.navigation.navigate('Group', { group: GroupListStore.getGroup(id) });
  }

  renderItem = ({item}) => {
    return (
      <GroupItem group={item} openGroup={this.onPressGroup}/>
    )
  }

  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }

  render() {
    let userPicUrlMap = {};
    UserListStore.users.forEach((user) => {
      userPicUrlMap[user.userId] = user['userPicUrl']
    })

    // loop through groups, keep only the ones with current user in them
    let groupResultList = [];
    GroupListStore.groups.forEach((group) => {
      if (group['memberList'].indexOf(UserStore.userId) != -1) {
        tempGroupResult = {
          name: group['groupName'],
          key: group['groupId'],
          size: group['memberList'].length,
          picUrl: group['groupPicUrl'],
        }

        // add all those prof pics
        for (let i = 0; i < group['memberList'].length; i++) {
          tempGroupResult['user' + (i+1)] = userPicUrlMap[group['memberList'][i]];
        }

        groupResultList.push(tempGroupResult);
      }
    });

    var filteredGroupList = groupResultList.filter(createFilter(this.state.searchTerm, ['name']));

    return (
      <View style={styles.container}>
        <Search searchUpdated={this.searchUpdated}/>
        <FlatList
          style={styles.cardsContainer}
          data={filteredGroupList}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  cardsContainer: {
    marginBottom: Metrics.smallMargin,
  },
  headerButton:{
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
})

export default view(GroupsMain);
