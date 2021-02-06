import axios, { AxiosInstance } from "axios";
// @ts-ignore
import {API_URL} from '@env';

const baseURL: string = API_URL;

const httpClient: AxiosInstance = axios.create({
  baseURL,
});

export default httpClient;
