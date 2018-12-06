import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import Search from './subcomponents/Search';
import GroupItem from './subcomponents/GroupItem';

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

  componentDidMount() {
    this.props.navigation.setParams({ onPressCreateGroup: this.onPressCreateGroup });
  }

  state = {
    groupList: [
      {
        name: 'CS147',
        key: '28327298',
        size: 4,
        picUrl: 'http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/need.jpg',
        user1: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
        user2: 'http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/chloe.png',
        user3: 'http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/cynthia.png',
      },
      {
        name: 'Disney',
        key: '56755554',
        size: 3,
        picUrl: 'https://nerdist.com/wp-content/uploads/2015/03/maxresdefault-970x545.jpg',
        user1: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
        user2: 'https://vignette.wikia.nocookie.net/disneyheroines/images/7/7c/Belle.jpg',
        user3: 'https://www.gannett-cdn.com/-mm-/09a7c94119fde38af582f9f815d623e4ee8d3ba2/c=0-64-2758-1622/local/-/media/2017/11/29/USATODAY/USATODAY/636475571371921197-XXX-IMG-XXX-IA01G1REAR09-8P-1-1-ELILBTVF-91704861.JPG',
      },
      {
        name: 'Camping',
        key: '90057000',
        size: 3,
        picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyM_i7rIKIc-wHw_VeW8lAyc68-zA3VcdT8zx97bG_QccOWLkt3w',
        user1: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
        user2: 'https://i.ytimg.com/vi/ClvjENmquG4/maxresdefault.jpg',
        user3: 'https://www.gannett-cdn.com/-mm-/09a7c94119fde38af582f9f815d623e4ee8d3ba2/c=0-64-2758-1622/local/-/media/2017/11/29/USATODAY/USATODAY/636475571371921197-XXX-IMG-XXX-IA01G1REAR09-8P-1-1-ELILBTVF-91704861.JPG',
      },
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
