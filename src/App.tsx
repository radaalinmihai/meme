import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators/MainTab';
import AuthenticationNavigator from './navigators/Authentication';
import {AuthProvider} from './contexts/auth/AuthContext';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  useEffect(() => {
    axios.defaults.baseURL = baseURL;
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        {/* <AuthenticationNavigator Stack={Stack} /> */}
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
