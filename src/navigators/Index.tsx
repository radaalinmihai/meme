import React from "react";
import AuthenticationNavigator from "./Authentication";
import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import MainNavigator from "./MainTab";

const Index: React.FC = (): JSX.Element => {
  const { access_token } = useAuth();
  return (
    <NavigationContainer>
      {access_token === undefined ? <AuthenticationNavigator /> :
        <MainNavigator />}
    </NavigationContainer>
  );
};

export default Index;
