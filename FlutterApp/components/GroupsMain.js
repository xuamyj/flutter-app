import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class GroupsMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Groups!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default GroupsMain;
