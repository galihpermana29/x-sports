import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getBearerToken } from './token';
const BEARER_TOKEN = getBearerToken();
const STATIC_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3MzExMjQ2NzN9.e-SrlKolTgUqRVZrK73fnPdpal1qJvL8hEmxMm7MEM4';

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

const createClientAPI = (
  baseURL: string = API_URL,
  config: ApiConfig = {}
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STATIC_BEARER_TOKEN}`,
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

const cmsApi = createAPI();
const clientApi = createClientAPI();

export { cmsApi, clientApi };
