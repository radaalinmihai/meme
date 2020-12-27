import axios, { AxiosInstance } from "axios";

const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const httpClient: AxiosInstance = axios.create({
  baseURL
});

export default httpClient;
