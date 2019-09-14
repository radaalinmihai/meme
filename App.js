import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Drawer from './components/Drawer';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import axios from 'react-native-axios';
import { getItem, removeItem } from './async_storage';
import AsyncStorage from '@react-native-community/async-storage';
import config from './axios_config';

const navigator = createDrawerNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  /* Register: RegisterScreen,
  Profile: ProfileScreen,
  Messages: MessagesScreen, */
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
  drawerWidth: 300,
  contentComponent: Drawer
});

const AppNavigator = createAppContainer(navigator);

export default class App extends React.Component {
  componentDidMount = async () => {
    const token = await getItem('@token');
    console.log(token);
    axios.post('/checkToken', '', {
      baseURL: config.baseURL,
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    })
      .then(res => console.log(res))
      .catch(err => console.warn(err));

  }
  render() {
    return <AppNavigator />;
  }
}