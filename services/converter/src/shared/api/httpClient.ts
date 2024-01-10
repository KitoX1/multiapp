import axios from 'axios';

import { responseInterceptorError, responseInterceptorSuccess } from './interceptors';

export const API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 60 * 1000,
  maxRedirects: 10,
});

httpClient.interceptors.response.use(responseInterceptorSuccess, responseInterceptorError);
