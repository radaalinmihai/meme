import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Drawer from './components/Drawer';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';

const navigator = createDrawerNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Profile: ProfileScreen,
  Messages: MessagesScreen,
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
  drawerWidth: 300,
  contentComponent: Drawer
});

const AppNavigator = createAppContainer(navigator);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}