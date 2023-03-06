import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { OktaAuth } from "@okta/okta-auth-js";

export interface ResponseData {
  data: any;
}

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8082/api/v1",
  headers: {
      "Content-type": "application/json",
    }
});

function createInterceptors(httpClient: AxiosInstance, authClient: OktaAuth) {
  const handleRequest = (config: AxiosRequestConfig) => {
    const accessToken: string = authClient.tokenManager.getTokensSync().accessToken!.accessToken;
    config!.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  const handleError = (error: unknown) => {
    return Promise.reject(error);
  };
  httpClient.interceptors.request.use(handleRequest, handleError);
}

export { httpClient, createInterceptors };
