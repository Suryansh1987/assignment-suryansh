import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from '../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    const apiError: ApiError = {
      message: 'エラーが発生しました',
      statusCode: error.response?.status,
    };

    if (error.response?.data) {
      apiError.message = error.response.data.message || apiError.message;
      apiError.errors = error.response.data.errors;
    } else if (error.request) {
      apiError.message = 'ネットワークエラーが発生しました';
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }

    return Promise.reject(apiError);
  }
);

export default api;
