import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ApiConfig extends AxiosRequestConfig {
  // Add any additional configuration properties specific to your API
}

const createAPI = (
  baseURL: string = 'https://api.x-sports.site/api/v1',
  config: ApiConfig = {}
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3MzExMDIzNjB9.5_xZmSX8KjAnwQ2NqhZdpooQXb0OgMf8ONJQm0d3lQc';
      request.headers.Authorization = `Bearer ${token}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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
