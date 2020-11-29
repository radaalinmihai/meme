import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import {DELIMITATOR_COLOR, SCREEN_BACKGROUND} from '../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NotificationScreen from '../screens/Notifications';
import OtherScreen from '../screens/Others';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          switch (route.name) {
            case 'MainStack':
              iconName = 'home';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'Others':
              iconName = 'more-horiz';
              break;
          }

          return <MaterialIcon name={iconName} size={38} color="white" />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: DELIMITATOR_COLOR,
          borderTopWidth: 0,
          height: 58
        },
      }}>
      <Tab.Screen name="MainStack" component={MainStack} />
      <Tab.Screen name='Notifications' component={NotificationScreen} />
      <Tab.Screen name='Others' component={OtherScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
