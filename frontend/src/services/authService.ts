import api from './api';
import type { ApiResponse } from '../types/api.types';
import type { SignupData, SigninData, AuthResponse, User } from '../types/auth.types';

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/signup', data);
    return response.data.data!;
  },

  /**
   * Sign in an existing user
   */
  async signin(data: SigninData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/signin', data);
    return response.data.data!;
  },

  /**
   * Verify current token
   */
  async verify(): Promise<User> {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/verify');
    return response.data.data!.user;
  },

  /**
   * Save auth data to localStorage
   */
  saveAuth(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Get user from localStorage
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  /**
   * Clear auth data
   */
  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
