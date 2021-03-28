// @ts-ignore
import { API_URL } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect } from "react";

import { ResponseCodes, StatusCodes } from "../helpers/enums";
import { IAuth } from "../helpers/interfaces";
import useAuth from "../hooks/useAuth";
import AuthenticationNavigator from "./Authentication";
import MainNavigator from "./MainTab";

axios.defaults.baseURL = API_URL;

const Index: React.FC = (): JSX.Element => {
	const { access_token, refresh_token, logout, setAuthCredentials } = useAuth();
	useEffect(() => {
		axios.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				// const originalReq = error.config;
				if (
					error.response?.status === StatusCodes.ForbiddenAccess &&
					error.response.data.code === ResponseCodes.SESSION_EXPIRED
				) {
					axios.defaults.headers["Authorization"] = `Bearer ${refresh_token}`;
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
			},
		);
	}, []);
	useEffect(() => {
		axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;
	}, [access_token]);
	return (
		<NavigationContainer>
			{!access_token ? <AuthenticationNavigator /> : <MainNavigator />}
		</NavigationContainer>
	);
};

export default Index;
