import React from 'react';
import LoginScreen from '../screens/Login';

const AuthenticationNavigator = ({Stack}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default AuthenticationNavigator;