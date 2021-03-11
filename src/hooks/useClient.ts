import axios, { AxiosError, AxiosResponse } from "axios";
// @ts-ignore
import {API_URL} from '@env';
import useAuth from "./useAuth";
import { ResponseCodes, StatusCodes } from "../helpers/enums";
import { IAuth } from "../helpers/interfaces";
import { useEffect } from "react";

export default function useClient() {
  const {access_token, refresh_token, logout, setAuthCredentials} = useAuth();
  const httpClient = axios.create({
    baseURL: API_URL
  });

  useEffect(() => {
  httpClient.interceptors.request.use(async (config) => {
    if(access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  }, error => Promise.reject(error));

  httpClient.interceptors.response.use(response => response, error => {
    const originalReq = error.config;
    if(error.response?.status === StatusCodes.ForbiddenAccess && error.response.data.code === ResponseCodes.OK) {
      httpClient.defaults.headers['Authorization'] = `Bearer ${refresh_token}`;
      httpClient.get('/auth/refreshToken').then((res: AxiosResponse<IAuth>) => {
        setAuthCredentials(res.data);
        httpClient.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`;
        return httpClient(originalReq);
      }).catch(async (err: AxiosError) => {
        await logout();
        httpClient.defaults.headers['Authorization'] = '';
        return Promise.reject(err);
      });
    }
    return Promise.reject(error);
  });
  }, []);

  return httpClient;
}
