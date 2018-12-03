import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { Metrics, Colors } from './Themes';

class GroupsMain extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Groups',
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

  onPressGroup = () => {
    this.props.navigation.navigate('Group', {});
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this.onChangeSearchText}
          onClearText={this.onClearSearchText}
          placeholder='Search groups...'
        />

        <List containerStyle={styles.groupList}>
          {
            this.state.groupList.map((l) => (
              <ListItem
                key={l.key}
                title={l.name}
                subtitle={l.subtitle}
                onPress={this.onPressGroup}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupList: {
    marginBottom: 20,
  },
  headerButton:{
    padding: Metrics.baseMargin * 1.5,
  },
})

export default GroupsMain;
