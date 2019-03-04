import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import Search from './subcomponents/Search';
import GroupItem from './subcomponents/GroupItem';
import SearchInput, { createFilter } from 'react-native-search-filter';

import Fire from '../Fire';

class GroupsMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      groupList: []
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Communities',
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

    this.callbackGetAllGroups = Fire.shared.getAllGroups(groupResult => {
      Fire.shared.getAllUsersOn(userResult => {
        // create map {userId: userPicUrl}
        let userPicUrlMap = {};
        userResult.forEach((childResult) => {
          userPicUrlMap[childResult.key] = childResult.val()['profile_picture']
        })

        // loop through groups, keep only the ones with current user in them
        let groupResultList = [];
        groupResult.forEach((childResult) => {
          let childResultObj = childResult.val();

          if (childResultObj['memberList'].indexOf(Fire.shared.uid) != -1) {
            tempGroupResult = {
              name: childResultObj['groupName'],
              key: childResult.key,
              size: childResultObj['memberList'].length,
              picUrl: childResultObj['groupPicUrl'],
            }

            // add all those prof pics
            for (let i = 0; i < childResultObj['memberList'].length; i++) {
              tempGroupResult['user' + (i+1)] = userPicUrlMap[childResultObj['memberList'][i]];
            }

            groupResultList.push(tempGroupResult);
          }
        });

        this.setState(previousState => ({
          groupList: groupResultList,
        }))
      });
    })
  }

  componentWillUnmount() {
    Fire.shared.offAllUsers(this.callbackGetAllGroups);
    Fire.shared.offGroups(this.callbackGetAllGroups);
  }

  onPressCreateGroup = () => {
    this.props.navigation.navigate('GroupCreate', {});
  }

  onPressGroup = (id) => {
    Fire.shared.getGroupName(id, nameResult => {
      this.props.navigation.navigate('Group', { groupId: id, groupName: nameResult });
    });
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
    var filteredGroupList = this.state.groupList.filter(createFilter(this.state.searchTerm, ['name']));

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

export default GroupsMain;
