import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Header from '../components/header';
import HomeScreen from '../screens/Home';
import {SCREEN_BACKGROUND} from '../styles/colors';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        gestureEnabled: true,
        cardStyle: {
          backgroundColor: SCREEN_BACKGROUND,
        },
        header: Header,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
