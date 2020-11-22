import React from 'react';
import HomeScreen from '../screens/Home';

const MainNavigator = ({Stack}) => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default MainNavigator;