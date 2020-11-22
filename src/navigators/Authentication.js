import React from 'react';
import {StatusBar} from 'react-native';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import {SCREEN_BACKGROUND} from '../styles/colors';

const AuthenticationNavigator = ({Stack}) => {
  return (
    <>
      <StatusBar animated backgroundColor={SCREEN_BACKGROUND} />
      <Stack.Navigator
        headerMode="none"
        gestureEnabled
        screenOptions={{
          cardStyle: {
            backgroundColor: SCREEN_BACKGROUND,
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthenticationNavigator;
