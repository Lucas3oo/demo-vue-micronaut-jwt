import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});


export interface ResponseData {
  data: any;
}

export default httpClient;