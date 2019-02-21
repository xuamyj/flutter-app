import { store } from 'react-easy-state'
import moment from 'moment'

itemInfo = [
  {
      itemId: '8',
      itemName: 'Chocolate rabbit!',
      groupId: 'Stanf trees',
      state: 'Given', // POSTED, GIVEN, COMPLETE
      giver: {
          id: '9',
          itemDescription: 'My boyfriend and I saw these chocolate rabbits on sale (post-Valentine\'s haha) but got wayyy too many. Looking for somebody to take some off of our hands -- but also to share it with your loved ones. It\'s BIG!',
          itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/rabbit.jpg'
      },
      receiver: {
          id: '1',
          itemDescription: '',
          itemPicUrl: ''
      },
  },
  {
      itemId: '11',
      itemName: 'Bird paperweights',
      groupId: 'Bay Art',
      state: 'COMPLETE', // POSTED, GIVEN, COMPLETE
      giver: {
          id: '3',
          itemDescription: 'I went to buy a set of glass dolphin paperweights, but accidentally came home with birds instead! They\'re q nice and I would only really give them to a friend. Anyone want to be their new nest?',
          itemPicUrl: 'https://www.westelm.com/weimgs/rk/images/wcm/products/201824/0289/st-jude-glass-bird-paperweight-c.jpg'
      },
      receiver: {
          id: '1',
          itemDescription: 'These are even more lovely in person :) Look how pretty they are on my desk!',
          itemPicUrl: 'https://www.westelm.com/weimgs/rk/images/wcm/products/201824/0313/st-jude-glass-bird-paperweight-c.jpg'
      },
  },
  {
    itemId: '94',
    itemName: 'Wooden longboard',
    state: 'COMPLETE',
    groupId: 'Stanf trees',
    giver: {
        itemDescription: 'My friend convinced me to get a boosted board, and it’s been very fun zooming around campus without pedalling :) But now I’m graduating, it’s looking for a new home!',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/longboard.png',
        id: '12',
    },
    receiver: {
        itemDescription: 'I LOVE ZIPPING DOWN SANTA TERESA ON THIS. Photo I took of Lag as I zoomed by!',
        itemPicUrl: 'https://rde-stanford-edu.s3.amazonaws.com/Housing/Images/Lagunita_New_474x325.jpg',
        id: '4',
    },
},
{
    itemId: '13',
    itemName: 'Silk scarf',
    groupId: 'Stanf trees',
    state: 'COMPLETE', // POSTED, GIVEN, COMPLETE
    giver: {
        id: '9',
        itemDescription: 'I\'m cleaning out my closet, and this silk scarf (passed down from my family) needs a home!',
        itemPicUrl: 'https://66.media.tumblr.com/efeffdfb2e3100550e1f91aa423e2d62/tumblr_pck2dplZRQ1roj277o1_500.jpg'
    },
    receiver: {
        id: '1',
        itemDescription: "This is so, so, so soft. I wear it all the time now, and I always get compliments!",
        itemPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/scarf.jpg"
    },
},
{
    itemId: '14',
    itemName: 'Cactus cup',
    groupId: 'Stanf trees',
    state: 'POSTED', // POSTED, GIVEN, COMPLETE
    giver: {
        id: '1',
        itemDescription: 'My ex gave me this cup. Too many memories :( Someone take it please?',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/80878_XXX_v1.tif&wid=650&cvt=jpeg'
    },
    receiver: null,
},
{
    itemId: '32',
    itemName: 'Magic books',
    state: 'GIVEN',
    groupId: 'Stanf trees',
    giver: {
        itemDescription: 'I have too many magic books in my house, but can\'t bear to throw any away. Does anyone want to adopt these? They come in a set.',
        itemPicUrl: 'https://thenypost.files.wordpress.com/2018/10/old-books.jpg',
        id: '1',
    },
    receiver: {
        itemDescription: '',
        itemPicUrl: '',
        id: '2',
    },
},
{
    itemId: '12',
    itemName: 'Handmade pillow',
    groupId: 'Bay Art',
    state: 'COMPLETE', // POSTED, GIVEN, COMPLETE
    giver: {
        id: '1',
        itemDescription: 'My aunt made this pillow by hand :) but I\'m about to move to the Netherlands and can\'t take it with me :(',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/79440_XXX_v1.tif&wid=650&cvt=jpeg'
    },
    receiver: {
        id: '7',
        itemDescription: 'Thanks Amy -- With a bit of magic I made my bed to match!',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/79440_XXX_v3.tif&wid=650&cvt=jpeg'
    },
},
{
    itemId: '24',
    itemName: 'Pusheen pillow',
    groupId: 'Stanf trees',
    state: 'POSTED',
    giver:{
        id: '3',
        itemDescription: 'Looking to give away this pillow, which is very important to me -- would be great to chat in person about why!',
        itemPicUrl: 'https://cdn.shopify.com/s/files/1/0057/8182/products/large-plush-front_700x700.png',
    },
    receiver: null,
},
{
    itemId: '543',
    itemName: 'Enamel rainbow pin',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Got this lil charm from a good friend! Unfortunately, I can’t pin it on any of my clothes or backpacks :( anyone want this?',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/rainbow.png',
        id: '10',
    },
    receiver: null,
},
{
    itemId: '62',
    itemName: 'Chicken sculpture!! My masterpiece~',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Is this not the cutest thing ever?? I made it in ceramics class :)',
        itemPicUrl: 'https://i.etsystatic.com/5162299/r/il/cdeb48/1567221375/il_1140xN.1567221375_384s.jpg',
        id: '7',
    },
    receiver: null,
},
{
    itemId: '63',
    itemName: 'Mom art',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Wanted to follow this tutorial online for book page folding but I kind of hate my mom right now...wanna take?',
        itemPicUrl: 'https://i.etsystatic.com/11935929/r/il/96f796/1147669963/il_1140xN.1147669963_blzm.jpg',
        id: '6',
    },
    receiver: null,
},
{
    itemId: '64',
    itemName: 'Bobbleheads',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Got these for a wedding but accidentally ordered an extra set. Admit it, these are pretty funny.',
        itemPicUrl: 'https://i.etsystatic.com/9820484/r/il/0055c9/1235090184/il_1140xN.1235090184_j93h.jpg',
        id: '7',
    },
    receiver: null,
},
{
    itemId: '65',
    itemName: 'Glass flowers',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'I have a literal ROOM full of these from my glassblowing class. PLEASE take some. They are all my precious babies.',
        itemPicUrl: 'https://i.etsystatic.com/5787638/r/il/71f041/773022592/il_1140xN.773022592_fkut.jpg',
        id: '7',
    },
    receiver: null,
},
{
    itemId: '66',
    itemName: 'Duck carving',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'My grandpa made this for me. He passed away a few years back and my heart breaks a little bit whenever I see this... If you do take it, please take care of it.',
        itemPicUrl: 'https://i.etsystatic.com/5423629/r/il/da6804/460149722/il_1140xN.460149722_31i9.jpg',
        id: '3',
    },
    receiver: null,
},
{
    itemId: '67',
    itemName: 'Duck carving',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'My grandpa made this for me. He passed away a few years back and my heart breaks a little bit whenever I see this... If you do take it, please take care of it.',
        itemPicUrl: 'https://i.etsystatic.com/5423629/r/il/da6804/460149722/il_1140xN.460149722_31i9.jpg',
        id: '3',
    },
    receiver: null,
},
{
    itemId: '68',
    itemName: 'Handpainted wave bag',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Upcycled a bunch of bags from the thrift store. Donating some back, but would anyone want this?',
        itemPicUrl: 'https://i.etsystatic.com/6209815/r/il/1b11fa/1190181899/il_1140xN.1190181899_qz28.jpg',
        id: '3',
    },
    receiver: null,
},
{
    itemId: '415',
    itemName: 'Red Shoes Painting',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Acrylic painting I made freshman year. Inspired by the movie “Red Wagons.” Have been holding on to this because it was via this dorm activity that I made a lot of the friends I have today. Have to part with it because moving to a one room double and don’t have enough space. Also worried I will not be able to maintain it in good condition. It\'s great for deocrating!',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/shoes.png',
        id: '5',
    },
    receiver: null,
},
{
    itemId: '45',
    itemName: 'Solar system dorm poster',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Got this at the exploratorium in SF last year. Looking to open up space on my walls for new merchandise! Big fan of space, a physics major and Nat Geo lover. So this is dear to my heart! Hope it can find a new home.',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/solar.png',
        id: '8',
    },
    receiver: null,
},
{
    itemId: '564',
    itemName: 'Chalk pastel anatomy drawing',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'HUGE chalk pastel drawing; I have no space to put it in my tiny apartment!! Anyone care to showcase it in their home? Give an art hobbyist some ~exposure~!!',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/drawing.png',
        id: '7',
    },
    receiver: null,
},
{
    itemId: '87',
    itemName: 'Watercolor painting',
    state: 'POSTED',
    groupId: 'Stanf trees',
    giver: {
        itemDescription: 'Hey guys, trying this app out. Does anyone want this painting I made? Could be good decoration!',
        itemPicUrl: 'https://render.fineartamerica.com/images/rendered/search/print/images/artworkimages/medium/1/colorful-rooster-hailey-e-herrera.jpg',
        id: '4',
    },
    receiver: null,
},
{
    itemId: '60',
    itemName: 'Nightstand',
    state: 'POSTED',
    groupId: 'Stanf trees',
    giver: {
        itemDescription: 'I bought this nightstand my freshman year of college and have had it all four years. Now that I’m graduating, I don’t have room in my new apartment. I’d love to pass it on to another student to be with them through their college adventures!',
        itemPicUrl: 'http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/objects/nightstand.jpg',
        id: '10',
    },
    receiver: null,
},
{
    itemId: '61',
    itemName: 'Bluebird Felt Mask',
    state: 'POSTED',
    groupId: 'Bay Art',
    giver: {
        itemDescription: 'Crafted up this mask for a masquerade. Anyone want to use this for a play?',
        itemPicUrl: 'https://i.etsystatic.com/5383725/r/il/446443/1672806615/il_1140xN.1672806615_ht38.jpg',
        id: '7',
    },
    receiver: null,
},
{
    itemId: '92',
    itemName: 'Spear',
    state: 'COMPLETE',
    groupId: 'Camping',
    giver: {
        itemDescription: 'This broken spear has seen me through many battles. Does anyone want it for hanging/framing in their house?',
        itemPicUrl: 'https://store.ubi.com/on/demandware.static/-/Sites-masterCatalog/default/dwe92f8ae1/images/large/5afda8ad6b54a4271407a8e3-collectible-5_Assassins_Creed_odyssey_spear.jpg',
        id: '5',
    },
    receiver: {
        id: '11',
        itemDescription: 'Used it when I went camping, and caught some fish. Had a good supper that night :)',
        itemPicUrl: 'https://www.sunnysports.com/blog/wp-content/uploads/2016/12/campfire-fish.jpg'
    },
},
{
    itemId: '113',
    itemName: 'Nostalgic bar of soap',
    state: 'POSTED',
    groupId: 'Camping',
    giver: {
        itemDescription: 'My father gave me this bar of soap, and I don\'t want to throw it away, but I\'m about to go on a journey across the Mediterranean, so hoping someone will take it.',
        itemPicUrl: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/65377_XXX_v1.tif&wid=650&cvt=jpeg',
        id: '2',
    },
    receiver: null,
},
]

userInfo = [
        {
            displayName: "John", //CHANGE NAME BEFORE EACH TEST
            userId: "1",
            email: "a@m.com",
            userPicUrl: "http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg",
        },
        {
            displayName: "Chloe",
            userId: "2",
            email: "c@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/chloe.png",
        },
        {
            displayName: "Cynthia",
            userId: "3",
            email: "cc@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/cynthia.png",
        },
        {
            displayName: "Jenny",
            userId: "4",
            email: "j@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/jenny.png",
        },
        {
            displayName: "Anthony",
            userId: "5",
            email: "anthony@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/anthony.png",
        },
        {
            displayName: "Greg",
            userId: "6",
            email: "greg@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/greg.png",
        },
        {
            displayName: "Jenna",
            userId: "7",
            email: "jenna@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/jenna.png",
        },
        {
            displayName: "Jon",
            userId: "8",
            email: "jon@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/jon.png",
        },
        {
            displayName: "Laura",
            userId: "9",
            email: "laura@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/laura.png",
        },
        {
            displayName: "Maria",
            userId: "10",
            email: "maira@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/maria.png",
        },
        {
            displayName: "Noah",
            userId: "11",
            email: "noah@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/noah.png",
        },
        {
            displayName: "Will",
            userId: "12",
            email: "will@m.com",
            userPicUrl: "http://web.stanford.edu/class/cs194h/projects/Flutter/app-images/people/will.png",
        },
    ];

chatInfo = [];

groupInfo = [
{
    groupName: 'Stanf trees',
    groupId: 'Stanf trees',
    memberList: [
        '1', '2', '3', '4', '10', '12'
    ],
    groupPicUrl: 'https://germanmotorspecialist.com/wp-content/uploads/2018/08/Stanford.jpg',
},
{
    groupName: 'Bay Art',
    groupId: 'Bay Art',
    memberList: [
        '1', '3', '5', '6', '9', '11', '2', '4', '7', '8', '10', '12'
    ],
    groupPicUrl: 'https://d2jv9003bew7ag.cloudfront.net/uploads/Victor-Reyes-Untitled.-Image-via-artofreyes.tumblr.com_-865x577.jpg',
},
{
    groupName: 'Camping',
    groupId: 'Camping',
    memberList: [
        '1', '7', '6'
    ],
    groupPicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyM_i7rIKIc-wHw_VeW8lAyc68-zA3VcdT8zx97bG_QccOWLkt3w',
},
];

const UserStore = store({
    userId: '1',
    userName: "John", //CHANGE NAME BEFORE EACH TEST
    setUserName(newUserName){
        UserStore.userName = newUserName;
        let userObj = UserListStore.getUserObject(UserStore.userId);
        let index = UserListStore.users.indexOf(userObj);
        UserListStore.users[index].displayName = newUserName;
        console.log(UserListStore.users);
        // UserListStore.users = UserListStore.users;// trigger rerender
    },
    setUserPicUrl(newUserPicUrl){
        UserStore.userPicUrl = newUserPicUrl;
        UserListStore.getUserObject(UserStore.userId).userPicUrl = newUserPicUrl;
        UserListStore.users = UserListStore.users;
    },
    userPicUrl: "http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg",
})

const UserListStore = store({
    users: userInfo,
    getUserObject(userId){
        for(var i = 0; i < UserListStore.users.length;++i){
            if (UserListStore.users[i].userId == userId) {
                return UserListStore.users[i];
            }
        }
        return undefined; // this should not happen :O
    }
})

const ChatListStore = store({
  chats: chatInfo,
  getChat(key) {
    for (var i = 0; i < ChatListStore.chats.length; ++i) {
      if (ChatListStore.chats[i].key == key) {
        return ChatListStore.chats[i];
      }
    }
    return undefined;
  }
})

const GroupListStore = store({
    groups: groupInfo,
    getGroup(groupId){
        for(var i = 0; i < GroupListStore.groups.length;++i){
            if (GroupListStore.groups[i].groupId == groupId) {
                return GroupListStore.groups[i];
            }
        }
        return undefined; // this should not happen :O
    }
})

const ItemListStore = store({
    items: itemInfo,
    getItem(itemId){
        for(var i = 0; i < ItemListStore.items.length;++i){
            if (ItemListStore.items[i].itemId == itemId) {
                return ItemListStore.items[i];
            }
        }
        return undefined; // this should not happen :O
    }
})


export {
    UserStore,
    UserListStore,
    GroupListStore,
    ItemListStore,
    ChatListStore,
}
