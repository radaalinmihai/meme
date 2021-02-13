import React, { useEffect } from "react";
import AuthenticationNavigator from "./Authentication";
import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import MainNavigator from "./MainTab";
import httpClient from "../helpers/httpClient";

const Index: React.FC = (): JSX.Element => {
  const { access_token } = useAuth();
  useEffect(() => {
    console.log({ access_token });
    httpClient.defaults.headers["Authorization"] = `Bearer ${access_token}`;
  }, [access_token]);
  return (
    <NavigationContainer>
      {!access_token ? <AuthenticationNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default Index;
