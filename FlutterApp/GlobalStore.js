import { store } from 'react-easy-state'
import moment from 'moment'

userInfo = [
        {
            displayName: "Amy",
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
        // {
        //     displayName: "jenny",
        //     userId: "4",
        //     email: "j@m.com",
        //     userPicUrl: "http://www.interestingfunfacts.com/files/2012/01/facts-about-hedgehog.jpg",
        // }
        {
            displayName: "Belle",
            userId: "5",
            email: "b@m.com",
            userPicUrl: "https://vignette.wikia.nocookie.net/disneyheroines/images/7/7c/Belle.jpg",
        },
        {
            displayName: "Mulan",
            userId: "6",
            email: "m@m.com",
            userPicUrl: "https://www.gannett-cdn.com/-mm-/09a7c94119fde38af582f9f815d623e4ee8d3ba2/c=0-64-2758-1622/local/-/media/2017/11/29/USATODAY/USATODAY/636475571371921197-XXX-IMG-XXX-IA01G1REAR09-8P-1-1-ELILBTVF-91704861.JPG",
        },
        {
            displayName: "Herodotus",
            userId: "7",
            email: "h@m.com",
            userPicUrl: "https://i.ytimg.com/vi/ClvjENmquG4/maxresdefault.jpg",
        }
    ];

groupInfo = [
{
    groupName: 'CS147',
    groupId: '2832789',
    memberList: [
        '1', '2', '3'
    ],
    groupPicUrl: 'http://web.stanford.edu/class/cs147/projects/TransformingLivingSpace/Flutter/images/need.jpg',
},
{
    groupName: 'Disney',
    groupId: '5894549',
    memberList: [
        '1', '5', '6'
    ],
    groupPicUrl: 'https://nerdist.com/wp-content/uploads/2015/03/maxresdefault-970x545.jpg',
},
{
    groupName: 'Camping',
    groupId: '9005600',
    memberList: [
        '1', '6', '7'
    ],
    groupPicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyM_i7rIKIc-wHw_VeW8lAyc68-zA3VcdT8zx97bG_QccOWLkt3w',
},
];

const UserStore = store({
    userId: '1',
    userName: "Amy",
    setUserName(newUserName){
        UserStore.userName = newUserName;
        UserListStore.getUserObject(UserStore.userId).userName = newUserName;
        UserListStore.users = UserListStore.users;// trigger rerender
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

const GroupListStore = store({
    groups: groupInfo,
    getUserObject(groupId){
        for(var i = 0; i < GroupListStore.groups.length;++i){
            if (GroupListStore.groups[i].groupId == groupId) {
                return GroupListStore.groups[i];
            }
        }
        return undefined; // this should not happen :O
    }
})


export {
    UserStore,
    UserListStore,
    GroupListStore,
}