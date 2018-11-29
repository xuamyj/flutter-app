import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { Card, Avatar, SearchBar } from 'react-native-elements';
import { Metrics, Colors } from '../Themes';


const {height, width} = Dimensions.get('window');

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
              <Animated.View style={styles.card}
                             key="{l.key}">
                <View style={styles.header}>
                  <View>
                    <Text style = {styles.titleheader}> 
                      {l.itemName}
                    </Text>
                  </View>
                  <View>
                    <Text style = {styles.groupheader}> 
                      {l.groupName}
                    </Text>
                  </View>
                </View>
                <Image
                style={styles.image}
                source={{uri: l.giveItemPicUrl}}>
                </Image>
                <View style={styles.caption}>
                  <Image style={styles.smallImageWrapper}
                        source={{uri: l.giveUserPicUrl}}>
                  </Image>
                  <View style={styles.captiontext}>
                    <Text>
                      <Text style={{fontWeight: "bold"}}> {l.giveUserName}:</Text>
                      <Text> {l.giveItemDescription}</Text>
                    </Text>
                  </View>
                </View>
              </Animated.View>
              
              /*
              <Card 
              title={l.itemName} 
              key="{l.key}"
              >
                {
                  <View>
                    <Text style = {{color: 'grey'}}> {l.groupName}</Text>

                    <View style={styles.group}>
                      <Avatar
                      xlarge
                      source={{uri: l.giveItemPicUrl}}
                      activeOpacity={0.7}
                      />
                      <View style={styles.caption}>
                        <Avatar
                          medium
                          rounded
                          source={{uri: l.giveUserPicUrl}}
                          activeOpacity={0.7}
                        />
                        <Text>
                          {l.giveUserName}: {l.giveItemDescription}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.group}>
                      <Avatar
                      xlarge
                      source={{uri: l.recvItemPicUrl}}
                      activeOpacity={0.7}
                      />
                      <View style={styles.caption}>
                        <Avatar
                        medium
                        rounded
                        source={{uri: l.recvUserPicUrl}}
                        activeOpacity={0.7}
                        />
                        <Text>
                          {l.recvUserName}: {l.recvItemDescription}
                        </Text>
                      </View>
                    </View>
                  </View>
                }
              </Card>
              */

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
  },
  group: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  caption: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
  },
  captiontext: {
    margin: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Metrics.doubleBaseMargin,
    borderColor: Colors.border,
    borderWidth: Metrics.borderWidth,
    margin: Metrics.baseMargin,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.screenWidth * 1.05,
    resizeMode: 'contain',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleheader: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  groupheader: {
    fontSize: 24,
  },
    smallImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
  },
})

export default Stories;
