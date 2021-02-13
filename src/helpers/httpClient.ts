import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
// @ts-ignore
import {API_URL} from '@env';
import { IAuth } from "./interfaces";
import AsyncStorage, {AsyncStorageStatic} from "@react-native-async-storage/async-storage";

const baseURL: string = API_URL;

const httpClient: AxiosInstance = axios.create({
  baseURL,
});

httpClient.interceptors.response.use(response => response, async (err: AxiosError): Promise<AxiosError> => {
  if(err.response?.status === 403 && err.response.data.code === "NO_ACCESS") {
    const user = JSON.parse(<string>await AsyncStorage.getItem('@user'));
    httpClient.defaults.headers['Authorization'] = `Bearer ${user.value.refresh_token}`;
    httpClient.get('/auth/refreshToken').then(async (res: AxiosResponse<IAuth>): Promise<AxiosPromise> => {
      if(res.data.code === 'OK') {
        await AsyncStorage.removeItem('@user');
        await AsyncStorage.setItem('@user', JSON.stringify({...res.data}));
        httpClient.defaults.headers['Authorization'] = res.data.access_token;
        return httpClient(err.config);
      } else if(res.data.code === 'REFRESH_TOKEN_EXPIRED') {
        await AsyncStorage.removeItem('@user');
      }
      return Promise.reject(err);
    }).catch((err: AxiosError) => {
      console.error(err.response?.data.message);
    });
  }
  return Promise.reject(err);
});

export default httpClient;
