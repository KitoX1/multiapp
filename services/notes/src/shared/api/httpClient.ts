import axios from 'axios';

import { responseInterceptorError, responseInterceptorSuccess } from './interceptors';

export const API_URL = 'https://659316eabb12970719905bec.mockapi.io/notes-api';

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
