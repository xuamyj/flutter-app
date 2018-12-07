import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';
import TreasureCard from './TreasureCard';
import Search from './Search';

class Treasures extends React.Component {

  state = {
    treasureList: [
      {
        itemName: 'Cactus cup',
        itemDescription: 'My ex gave me this cup. Too many memories :( Someone take it please?',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/80878_XXX_v1.tif&wid=650&cvt=jpeg',
        groupName: 'Disney',
        userName: 'Amy',
        userPicUrl: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',
        key: '11',
      },
      {
        itemName: 'Pusheen pillow',
        itemDescription: 'Looking to give away this pillow, which is very important to me--would be great to chat in person about why!',
        itemPicUrl: 'https://cdn.shopify.com/s/files/1/0057/8182/products/large-plush-front_700x700.png',
        groupName: 'CS147',
        userName: 'Jenny',
        userPicUrl: 'https://i.imgur.com/oiH6yzg.jpg',
        key: '24',
      },
      {
        itemName: 'Magic books',
        itemDescription: 'I have too many magic books in my house, but can\'t bear to throw any away. Does anyone want to adopt these? They come in a set.',
        itemPicUrl: 'https://thenypost.files.wordpress.com/2018/10/old-books.jpg',
        groupName: 'Disney',
        userName: 'Belle',
        userPicUrl: 'https://vignette.wikia.nocookie.net/disneyheroines/images/7/7c/Belle.jpg',
        key: '32',
      },
      {
        itemName: 'Watercolor painting',
        itemDescription: 'Hey guys, trying this app out. Does anyone want this painting I made?',
        itemPicUrl: 'https://render.fineartamerica.com/images/rendered/search/print/images/artworkimages/medium/1/colorful-rooster-hailey-e-herrera.jpg',
        groupName: 'Disney',
        userName: 'Mulan',
        userPicUrl: 'https://www.gannett-cdn.com/-mm-/09a7c94119fde38af582f9f815d623e4ee8d3ba2/c=0-64-2758-1622/local/-/media/2017/11/29/USATODAY/USATODAY/636475571371921197-XXX-IMG-XXX-IA01G1REAR09-8P-1-1-ELILBTVF-91704861.JPG',
        key: '87',
      },
      {
        itemName: 'Spear',
        itemDescription: 'This broken spear has seen me through many battles. Does anyone want it for hanging/framing in their house?',
        itemPicUrl: 'https://store.ubi.com/on/demandware.static/-/Sites-masterCatalog/default/dwe92f8ae1/images/large/5afda8ad6b54a4271407a8e3-collectible-5_Assassins_Creed_odyssey_spear.jpg',
        groupName: 'Camping',
        userName: 'Herodotus',
        userPicUrl: 'https://i.ytimg.com/vi/ClvjENmquG4/maxresdefault.jpg',
        key: '92',
      },
      {
        itemName: 'Nostalgic bar of soap',
        itemDescription: 'My father gave me this bar of soap, and I don\'t want to throw it away, but I\'m about to go on a journey across the Mediterranean, so hoping someone will take it.',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/65377_XXX_v1.tif&wid=650&cvt=jpeg',
        groupName: 'Camping',
        userName: 'Herodotus',
        userPicUrl: 'https://i.ytimg.com/vi/ClvjENmquG4/maxresdefault.jpg',
        key: '113',
      },
    ],
    isModalVisible: false,
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  renderItem({item}) {
    return (
      <TreasureCard treasure={item} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Search />
        <FlatList
          style={styles.cardsContainer}
          data={this.state.treasureList}
          renderItem={this.renderItem}
          numColumns={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  cardsContainer: {
    paddingHorizontal: Metrics.baseMargin * 1.5,
    marginBottom: Metrics.smallMargin,
  },
})

export default Treasures;
