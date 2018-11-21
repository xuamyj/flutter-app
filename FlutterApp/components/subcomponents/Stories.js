import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';

class Stories extends React.Component {

  state = {
    storyList: [
      {
        itemName: 'Glass birds',
        groupName: 'CS147',

        giveItemDescription: 'I went to buy a set of glass dolphin paperweights, but accidentally came home with birds instead! They\'re q nice and I would only really give them to a friend. Anyone want to be their new nest?',
        giveItemPicUrl: 'https://www.westelm.com/weimgs/rk/images/wcm/products/201824/0289/st-jude-glass-bird-paperweight-c.jpg',
        giveUserName: 'Cynthia',
        giveUserPicUrl: 'https://i.imgur.com/z7fgB60.jpg',

        recvItemDescription: 'These are even more lovely in person :) Look how pretty they are on my desk!',
        recvItemPicUrl: 'https://www.westelm.com/weimgs/rk/images/wcm/products/201824/0313/st-jude-glass-bird-paperweight-c.jpg',
        recvUserName: 'Amy',
        recvUserPicUrl: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',

        key: '7002',
      },
      {
        itemName: 'Handmade pillow',
        groupName: 'Disney',

        giveItemDescription: 'My aunt made this pillow by hand :) but I\'m about to move to the Netherlands and can\'t take it with me :(',
        giveItemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/79440_XXX_v1.tif&wid=650&cvt=jpeg',
        giveUserName: 'Amy',
        giveUserPicUrl: 'http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg',

        recvItemDescription: 'Thanks Amy--With a bit of magic I made my bed to match!',
        recvItemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/79440_XXX_v3.tif&wid=650&cvt=jpeg',
        recvUserName: 'Belle',
        recvUserPicUrl: 'https://vignette.wikia.nocookie.net/disneyheroines/images/7/7c/Belle.jpg',

        key: '7008',
      },
    ],
  }

  onChangeSearchText = () => null; // search; do last
  onClearSearchText = () => null; // search; do last

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this.onChangeSearchText}
          onClearText={this.onClearSearchText}
          placeholder='Search stories...'
        />

        <ScrollView>
          {
            this.state.storyList.map((l) => (
              <Card title={l.itemName} key="{l.key}">
                {
                  <View>
                    <Text>
                      {l.groupName}
                    </Text>

                    <Avatar
                      xlarge
                      source={{uri: l.giveItemPicUrl}}
                      activeOpacity={0.7}
                    />
                    <Avatar
                      xlarge
                      source={{uri: l.recvItemPicUrl}}
                      activeOpacity={0.7}
                    />

                    <Avatar
                      medium
                      rounded
                      source={{uri: l.giveUserPicUrl}}
                      activeOpacity={0.7}
                    />
                    <Text>
                      {l.giveUserName}
                    </Text>
                    <Text>
                      {l.giveItemDescription}
                    </Text>

                    <Avatar
                      medium
                      rounded
                      source={{uri: l.recvUserPicUrl}}
                      activeOpacity={0.7}
                    />
                    <Text>
                      {l.recvUserName}
                    </Text>
                    <Text>
                      {l.recvItemDescription}
                    </Text>
                  </View>
                }
              </Card>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  }
})

export default Stories;
