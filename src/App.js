import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import useUser from './hooks/useUser';
import MainNavigator from './navigators/Main';
import rootReducer from './storage/reducers/rootReducer';

const store = createStore(rootReducer);
const Stack = createStackNavigator();

const App = () => {
  const {isLogged} = useUser();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator Stack={Stack} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
