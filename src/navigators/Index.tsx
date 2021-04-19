import { API_URL } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";

import { useAuth } from "../contexts/auth/AuthContext";
import { ResponseCodes, StatusCodes } from "../helpers/enums";
import AuthenticationNavigator from "./Authentication";
import MainNavigator from "./MainTab";

axios.defaults.baseURL = API_URL;

const Index: React.FC = (): JSX.Element => {
	const { access_token, refresh_token, logout } = useAuth();
	useEffect(() => {
		axios.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				if (
					error.response?.status === StatusCodes.ForbiddenAccess &&
					error.response.data.code === ResponseCodes.SESSION_EXPIRED
				) {
					axios.defaults.headers["Authorization"] = `Bearer ${refresh_token}`;
					await logout();
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
