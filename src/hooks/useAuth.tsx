import { AxiosResponse } from "axios";
import axios from "axios";
import { useContext } from "react";

import { authStore } from "../contexts/auth/AuthContext";
import { ResponseCodes } from "../helpers/enums";
import { IAuth, IAuthCred, IErrorAuth, IRegister, IRegisterRes } from "../helpers/interfaces";
import showError from "../helpers/showError";
import showSuccess from "../helpers/showSuccess";

export default function useAuth() {
	const {
		state: { access_token, refresh_token },
		dispatch,
	} = useContext(authStore);

	const setTokens = (res: AxiosResponse<IRegisterRes>): void => {
		const { code, access_token, refresh_token } = res.data;
		if (code === ResponseCodes.OK) {
			dispatch((state: IAuth) => ({
				...state,
				access_token,
				refresh_token,
			}));
			showSuccess("Successfully logged in! Redirecting..");
		}
	};

	const setAuthCredentials = (data: IAuth) => {
		dispatch((state: IAuth) => ({
			...state,
			...data,
		}));
	};

	const errorOut = (err: IErrorAuth) => {
		console.log(err);
		showError(err.response?.data.message);
	};

	const login = (data: IAuthCred): void => {
		axios.post("/auth/login", data).then(setTokens).catch(errorOut);
	};

	const register = (data: IRegister): void => {
		axios.post("/auth/register", data).then(setTokens).catch(errorOut);
	};

	const logout = async () => {
		dispatch(() => ({
			access_token: "",
			refresh_token: "",
		}));
	};

	return {
		access_token,
		refresh_token,
		login,
		register,
		setAuthCredentials,
		logout,
	};
}
