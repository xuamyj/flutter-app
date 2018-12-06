import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';
import Search from './subcomponents/Search';

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
        subtitle: 'You, Chloe, Cynthia, and 1 other'
      },
      {
        name: 'Disney',
        key: '56755554',
        subtitle: 'You, Belle, and Mulan'
      },
      {
        name: 'Camping',
        key: '90057000',
        subtitle: 'You, Herodotus, and Mulan'
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

  render() {
    return (
      <View style={styles.container}>
      <Search />

        <ScrollView>
          {
            this.state.groupList.map((l) => (
              <ListItem
                key={l.key}
                title={l.name}
                subtitle={l.subtitle}
                onPress={() => {this.onPressGroup(l.name)}}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton:{
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
})

export default GroupsMain;
