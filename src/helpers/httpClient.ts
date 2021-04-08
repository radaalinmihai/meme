// @ts-ignore
import {API_URL} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

import useAuth from "../hooks/useAuth";
import {ResponseCodes, StatusCodes} from "./enums";
import {IAuth} from "./interfaces";

const baseURL: string = API_URL;

const httpClient: AxiosInstance = axios.create({
  baseURL,
});

// httpClient.interceptors.request.use(async (res) => {
//   const {access_token} = useAuth();
//   console.log({access_token});
//   if(access_token)
//     res.headers["Authorization"] = `Bearer ${access_token}`;
//   return res;
// }, error => Promise.reject(error));
//
// httpClient.interceptors.response.use(response => response, async (err: AxiosError): Promise<AxiosError> => {
//   const originalRequest = err.config;
//   const {refresh_token, logout, setAuthCredentials} = useAuth();
//   console.log(err.response?.data);
//   if(err.response?.status === StatusCodes.ForbiddenAccess && err.response.data.code === ResponseCodes.SESSION_EXPIRED) {
//     httpClient.defaults.headers['Authorization'] = `Bearer ${refresh_token}`;
//     httpClient.get('/auth/refreshToken').then((res: AxiosResponse<IAuth>) => {
//       console.log(res.data);
//       setAuthCredentials(res.data);
//       httpClient.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`;
//       return httpClient(originalRequest);
//     }).catch(async (error: AxiosError) => {
//       await logout();
//       console.error(error.response?.data);
//       httpClient.defaults.headers['Authorization'] = '';
//       return Promise.reject(error);
//     })
//   }
//   return Promise.reject(err);
// });

export default httpClient;
