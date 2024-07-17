import axios, { AxiosResponse } from "axios";

const HOST_URL = "https://test.v5.pryaniky.com";

const API_URL = `${HOST_URL}/ru/data/v3/testmethods/docs/`;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const handleRequest = (promise: Promise<AxiosResponse<any>>) => {
  return promise
    .then((res) => {
      if (res.data.data) {
        return {
          data: res.data.data,
        };
      }
      return {
        error: res.data.error_text,
      };
    })
    .catch((error) => {
      return Promise.resolve({ error: error, data: undefined });
    });
};
