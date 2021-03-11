import React, { useEffect } from "react";
import AuthenticationNavigator from "./Authentication";
import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import MainNavigator from "./MainTab";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseCodes, StatusCodes } from "../helpers/enums";
import { IAuth } from "../helpers/interfaces";
// @ts-ignore
import { API_URL } from "@env";

axios.defaults.baseURL = API_URL;

const Index: React.FC = (): JSX.Element => {
  const { access_token, refresh_token, logout, setAuthCredentials } = useAuth();
  useEffect(() => {
    axios.interceptors.response.use(response => response, async error => {
      // console.error(error.response);
      const originalReq = error.config;
      console.log(error.response.code);
      if(error.response?.status === StatusCodes.ForbiddenAccess) {
        axios.defaults.headers['Authorization'] = `Bearer ${refresh_token}`;
        await logout();
        // axios.get('/auth/refreshToken').then((res: AxiosResponse<IAuth>) => {
        //   setAuthCredentials(res.data);
        //   axios.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`;
        //   return axios(originalReq);
        // }).catch(async (err: AxiosError) => {
        //   console.log(err.response);
        //   await logout();
        //   axios.defaults.headers['Authorization'] = '';
        //   return Promise.reject(err);
        // });
      }
      return Promise.reject(error);
    });
  }, []);
  useEffect(() => {
    axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  }, [access_token]);
  return (
    <NavigationContainer>
      {!access_token ? <AuthenticationNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default Index;
