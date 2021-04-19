import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext } from "react";
import { usePersistStorage } from "react-native-use-persist-storage";

import { ResponseCodes } from "../../helpers/enums";
import { IAuth, IAuthCred, IErrorAuth, IRegister, IRegisterRes } from "../../helpers/interfaces";
import showError from "../../helpers/showError";
import showSuccess from "../../helpers/showSuccess";

const initialState: IAuth = {
	access_token: "",
	refresh_token: "",
};

const authStore: React.Context<any> = createContext(initialState);

const { Provider } = authStore;
const persistKey = "@user";

const AuthProvider: React.FC = ({ children }): JSX.Element => {
	const [state, dispatch] = usePersistStorage<IAuth>(persistKey, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useAuth = () => {
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
};

export { AuthProvider, useAuth };
