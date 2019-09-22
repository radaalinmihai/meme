import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Drawer from './components/Drawer';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Messages: MessagesScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    drawerWidth: 300,
    contentComponent: Drawer,
  },
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppDrawer,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
