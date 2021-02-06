import { useContext } from "react";
import { authStore } from "../contexts/auth/AuthContext";
import { SIGN_UP } from "../contexts/auth/AuthActions";
import { IAuthCred, IRegister, IRegisterRes } from "../helpers/interfaces";
import { AxiosResponse } from "axios";
import httpClient from "../helpers/httpClient";

export default function useAuth() {
  const { state, dispatch } = useContext(authStore);

  const login = (data: IAuthCred): void => {
    const stringifiedData: string = JSON.stringify(data);
    httpClient.post("/auth/login", stringifiedData).then((res) => {
      console.log(res.data);
    }).catch(err => {

    });
  };

  const register = (data: IRegister): void => {
    console.log({ data });
    httpClient.post("/register", data).then((res: AxiosResponse<IRegisterRes>) => {
      const { code, access_token, refresh_token } = res.data;
      if (code === "OK") {
        dispatch({
          type: SIGN_UP,
          payload: { access_token, refresh_token }
        });
      }
    }).catch(err => {
      console.error(err);
    });
  };

  return { state, login, register };
}
