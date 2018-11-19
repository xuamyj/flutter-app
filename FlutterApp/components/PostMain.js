import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class PostMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post new item!</Text>
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

export default PostMain;
