// Import the screens
import ChatMain from './components/ChatMain';
import Chat from './components/Chat';
// Import React Navigation
import { createStackNavigator } from 'react-navigation'
// Create the navigator
const navigator = createStackNavigator({
  ChatMain: { screen: ChatMain },
  Chat: { screen: Chat },
});
// Export it as the root component
export default navigator