import { useContext } from "react";
import { authStore } from "../contexts/auth/AuthContext";
import { SIGN_UP } from "../contexts/auth/AuthActions";
import { IAuth, IAuthCred, IErrorAuth, IRegister, IRegisterRes } from "../helpers/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import httpClient from "../helpers/httpClient";
import { showMessage } from "react-native-flash-message";

export default function useAuth() {
  const { state: {access_token}, dispatch } = useContext<IAuth>(authStore);

  const setTokens = (res: AxiosResponse<IRegisterRes>): void => {
    const { code, access_token, refresh_token } = res.data;
    if (code === "OK") {
      dispatch((state: IAuth) => ({
        ...state,
        access_token, refresh_token
      }));
      showMessage({
        message: "Success",
        description: "Successfully logged in! Redirecting..",
        type: "success",
        duration: 3000
      });
    }
  };

  const errorOut = (err: IErrorAuth) => {
    showMessage({
      message: "Error",
      description: err.response?.data.error,
      type: "danger",
      duration: 3000
    });
  };

  const login = async (data: IAuthCred): Promise<void> => {
    await httpClient.post("/auth/login", data).then(setTokens).catch(errorOut);
  };

  const register = async (data: IRegister): Promise<void> => {
    console.log({ data });
    await httpClient.post("/auth/register", data).then(setTokens).catch(errorOut);
  };

  return { access_token, login, register };
}
