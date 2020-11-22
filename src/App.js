import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import useUser from './hooks/useUser';
import MainNavigator from './navigators/Main';
import AuthenticationNavigator from './navigators/Authentication';

const Stack = createStackNavigator();

const App = () => {
  const {isLogged, user} = useUser();
  console.log(user);
  return (
    <NavigationContainer>
      {isLogged ? <MainNavigator Stack={Stack} /> : <AuthenticationNavigator Stack={Stack} />}
    </NavigationContainer>
  );
};

export default App;
