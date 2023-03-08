import { OktaAuth } from "@okta/okta-auth-js";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export function buildHttpClient(backendApiUrl: string, oktaClient: OktaAuth): AxiosInstance {
  const httpClient: AxiosInstance = axios.create({
    baseURL: backendApiUrl + "/api/v1",
    headers: {
      "Content-type": "application/json",
    },
  });
  const handleRequest = (config: AxiosRequestConfig) => {
    const accessToken: string = oktaClient.tokenManager.getTokensSync().accessToken!.accessToken;
    config!.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  const handleError = (error: unknown) => {
    return Promise.reject(error);
  };
  httpClient.interceptors.request.use(handleRequest, handleError);

  return httpClient;
}

// misc common types for http communication
export interface ResponseData {
  data: any;
}
