import { Image } from 'react-native';

// Import the screens
import HomeMain from './components/HomeMain';
import GroupsMain from './components/GroupsMain';
import Group from './components/Group';
import GroupCreate from './components/GroupCreate';
import PostMain from './components/PostMain';
import ChatMain from './components/ChatMain';
import Chat from './components/Chat';
import ProfileMain from './components/ProfileMain';
import Settings from './components/Settings';

// Import the authentication screens
import AuthLoading from './components/authentication/AuthLoading';
import SignUp from './components/authentication/SignUp';
import Login from './components/authentication/Login';

// Import React Navigation
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'

// Create the Home navigator
const HomeStack = createStackNavigator({
  Home: { screen: HomeMain },
});

// Create the Groups navigator
const GroupsStack = createStackNavigator({
  GroupsMain: { screen: GroupsMain },
  Group: { screen: Group },
  GroupCreate: { screen: GroupCreate },
});

// Create the Post navigator
const PostStack = createStackNavigator({
  Post: { screen: PostMain },
});

// Create the Chat navigator
const ChatStack = createStackNavigator({
  ChatMain: { screen: ChatMain },
  Chat: { screen: Chat },
});

// Create the Profile navigator
const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileMain },
  Settings: { screen: Settings },
});

// Bottom tab
const AppNavigator = createBottomTabNavigator({
  HOME: HomeStack,
  GROUPS: GroupsStack,
  POST: PostStack,
  CHAT: ChatStack,
  PROFILE: ProfileStack,
}, {
  tabBarOptions: {
    activeTintColor: '#49B6BB',
  }
});

// Authentication screens
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    SignUp: SignUp,
    Login: Login,
    App: AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
