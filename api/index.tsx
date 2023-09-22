import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getBearerToken } from './token';
const BEARER_TOKEN = getBearerToken();

export const API_URL = 'https://api.x-sports.site/api/v1';

interface ApiConfig extends AxiosRequestConfig {
  // Add any additional configuration properties specific to your API
}

const createAPI = (
  baseURL: string = API_URL,
  config: ApiConfig = {}
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

const api = createAPI();

export default api;
