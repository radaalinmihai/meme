import {useContext} from 'react';
import {authStore} from '../contexts/auth/AuthContext';
import { SIGN_UP } from "../contexts/auth/AuthActions";
import { IAuthCred, IRegister, IRegisterRes } from "../helpers/interfaces";
import axios, { AxiosResponse } from "axios";
import httpClient from "../helpers/httpClient";

export default function useAuth() {
  const {state, dispatch} = useContext(authStore);

  const login = (data: IAuthCred): void => {
    axios.get('https://randomuser.me/api/').then((res: any) => {
      // dispatch({
      //   type: GET_USER,
      //   payload: res.data.results,
      // });
    });
  };

  const register = (data: IRegister): void => {
    console.log({ data });
    httpClient.post('/register', data).then((res: AxiosResponse<IRegisterRes>) => {
      const {code, access_token, refresh_token} = res.data;
      if(code === 'OK') {
        dispatch({
          type: SIGN_UP,
          payload: {access_token, refresh_token}
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  return {state, login, register};
}
