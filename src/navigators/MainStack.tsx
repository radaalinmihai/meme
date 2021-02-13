import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Header from '../components/header';
import HomeScreen from '../screens/Home/Home';
import {SCREEN_BACKGROUND} from '../styles/colors';
import ProfileScreen from "../screens/Home/Profile";

const Stack = createStackNavigator();

const MainStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: Header,
        cardStyle: {
          backgroundColor: SCREEN_BACKGROUND
        }
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
