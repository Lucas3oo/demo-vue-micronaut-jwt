import axios from "axios";
import type { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8082/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export interface ResponseData {
  data: any;
}

export default httpClient;
