import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import Search from './subcomponents/Search';
import GroupItem from './subcomponents/GroupItem';

import Fire from '../Fire';

class GroupsMain extends React.Component {
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
      }
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

        console.log('userPicUrlMap', userPicUrlMap);

        // loop through groups, keep only the ones with current user in them
        let groupResultList = [];
        groupResult.forEach((childResult) => {
          let childResultObj = childResult.val();

          if (childResultObj['memberList'].indexOf(Fire.shared.uid) != -1) {
            tempGroupResult = {
              name: childResultObj['groupName'],
              key: childResultObj['groupId'],
              size: childResultObj['memberList'].length,
              picUrl: childResultObj['groupPicUrl'],
            }

            // add all those prof pics
            for (let i = 0; i < childResultObj['memberList'].length; i++) {
              tempGroupResult['user' + (i+1)] = userPicUrlMap[childResultObj['memberList'][i]];
            }

            console.log('tempGroupResult', tempGroupResult);

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

  state = {
    groupList: [
    ]
  };

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  onPressCreateGroup = () => {
    this.props.navigation.navigate('GroupCreate', {});
  }

  onPressGroup = (name) => {
    this.props.navigation.navigate('Group', { name: name });
  }

  renderItem = ({item}) => {
    return (
      <GroupItem group={item} openGroup={this.onPressGroup}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Search />
        <FlatList
          style={styles.cardsContainer}
          data={this.state.groupList}
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
