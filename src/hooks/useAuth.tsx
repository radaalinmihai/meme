import { useContext } from "react";
import { authStore } from "../contexts/auth/AuthContext";
import { IAuth, IAuthCred, IErrorAuth, IRegister, IRegisterRes } from "../helpers/interfaces";
import { AxiosResponse } from "axios";
import httpClient from "../helpers/httpClient";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const { state: { access_token }, dispatch } = useContext(authStore);

  const setTokens = (res: AxiosResponse<IRegisterRes>): void => {
    const { code, access_token, refresh_token } = res.data;
    if (code === "OK") {
      dispatch((state: IAuth) => ({
        ...state,
        access_token, refresh_token,
      }));
      showMessage({
        message: "Success",
        description: "Successfully logged in! Redirecting..",
        type: "success",
        duration: 3000,
      });
    }
  };

  const errorOut = (err: IErrorAuth) => {
    showMessage({
      message: "Error",
      description: err.response?.data.message,
      type: "danger",
      duration: 3000,
    });
  };

  const login = (data: IAuthCred): void => {
    httpClient.post("/auth/login", data).then(setTokens).catch(errorOut);
  };

  const register = (data: IRegister): void => {
    httpClient.post("/auth/register", data).then(setTokens).catch(errorOut);
  };

  const logout = async () => {
    dispatch(() => ({
      access_token: '',
      refresh_token: '',
    }));
  };

  return { access_token, login, register, logout };
}
