import axios, { AxiosError, AxiosInstance } from "axios";
// @ts-ignore
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponseCodes, StatusCodes } from "./enums";

const baseURL: string = API_URL;

const httpClient: AxiosInstance = axios.create({
  baseURL
});

httpClient.interceptors.request.use(async (res) => {
  const userToken = JSON.parse(<string>await AsyncStorage.getItem("@user"));
  res.headers["Authorization"] = `Bearer ${userToken.access_token}`;
  return res;
}, error => Promise.reject(error));

httpClient.interceptors.response.use(response => response, async (err: AxiosError): Promise<AxiosError> => {
  const originalRequest = err.config;
  if(err.response?.status === StatusCodes.ForbiddenAccess && err.response.data.message === ResponseCodes.REFRESH_TOKEN_EXPIRED) {
    const user = JSON.parse(<string>await AsyncStorage.getItem('@user'));
    httpClient.defaults.headers['Authorization'] = `Bearer ${user.refresh_token}`;
    httpClient.get('/auth/refreshToken').then((res) => {
      console.log(res.data);
      return httpClient(originalRequest);
    });
  }
  return Promise.reject(err);
});

export default httpClient;
