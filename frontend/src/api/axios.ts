import axios from 'axios';
import { ApiError } from '../types/expense';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data as ApiError);
    }
    return Promise.reject({ error: 'Network error' } as ApiError);
  }
);

export default api;
