import React  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators/MainTab';
import AuthenticationNavigator from './navigators/Authentication';
import {AuthProvider} from './contexts/auth/AuthContext';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <NavigationContainer>
         {/*<AuthenticationNavigator />*/}
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
