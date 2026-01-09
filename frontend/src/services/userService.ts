import api from './api';
import type { ApiResponse } from '../types/api.types';
import type { User } from '../types/auth.types';

export interface UpdateProfileData {
  name?: string;
  city?: string;
  prefecture?: string;
  farmSize?: string;
  cropTypes?: string[];
  farmingMethods?: string[];
}

export const userService = {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<{ user: User }>>('/users/profile');
    return response.data.data!.user;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await api.put<ApiResponse<{ user: User }>>('/users/profile', data);
    return response.data.data!.user;
  },

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<void> {
    await api.delete('/users/account');
  },
};
