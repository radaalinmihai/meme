import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import {SCREEN_BACKGROUND} from "../styles/colors";

const Stack = createStackNavigator();

const AuthenticationNavigator = (): JSX.Element => {
  return (
    <>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: SCREEN_BACKGROUND,
            justifyContent: "center",
            flex: 1,
          },
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthenticationNavigator;
