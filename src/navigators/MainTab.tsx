import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import {DELIMITATOR_COLOR, SCREEN_BACKGROUND} from '../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NotificationScreen from '../screens/Notifications';
import OtherScreen from '../screens/Others';
import {StatusBar, TouchableNativeFeedback, View} from 'react-native';

const Tab = createBottomTabNavigator();
// Export each of the components bellow to its own function
const MainNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={SCREEN_BACKGROUND} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarButton: ({children, onPress}) => {
            return (
              <TouchableNativeFeedback onPress={onPress}>
                <View style={{
                  borderRightWidth: 1,
                  borderRightColor: '#1F1F1F',
                  flex: 1,
                  backgroundColor: DELIMITATOR_COLOR
                }}>{children}</View>
              </TouchableNativeFeedback>
            );
          },
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

            return <MaterialIcon name={iconName} size={38} color={focused ? "#696969" : "white"} />;
          },
        })}
        tabBarOptions={{
          tabStyle: {
            backgroundColor: DELIMITATOR_COLOR,
          },
          showLabel: false,
          style: {
            height: 58,
            borderTopWidth: 1,
            borderTopColor: SCREEN_BACKGROUND,
          }
        }}>
        <Tab.Screen name="MainStack" component={MainStack} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Others" component={OtherScreen} />
      </Tab.Navigator>
    </>
  );
};

export default MainNavigator;
