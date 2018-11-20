import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';

class GroupsMain extends React.Component {
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
        <TouchableOpacity onPress={this.onPressCreateGroup}>
          <Icon
            name='group-add'
            color='#49B6BB'
          />
        </TouchableOpacity>

        <Text>
          Groups
        </Text>

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
  }
})

export default GroupsMain;
