import axios from 'axios';

import type { AxiosInstance } from 'axios';
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

export default apiClient;
