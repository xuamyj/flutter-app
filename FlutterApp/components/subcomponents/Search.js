import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';

class Search extends React.Component {

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  render() {
    return (
        <SearchBar
          round
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBar}
          onChangeText={(term) => this.props.searchUpdated(term)}
          onClearText={this.onClearSearchText}
          placeholder='Search...'
          clearIcon
        />
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBar: {
    backgroundColor: Colors.background,
    fontSize: 15,
  },
})

export default Search;
