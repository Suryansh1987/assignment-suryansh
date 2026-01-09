import api from './api';
import type { ApiResponse } from '../types/api.types';
import type { WeatherData } from '../types/weather.types';

export const weatherService = {
  /**
   * Get current weather for user's location
   */
  async getCurrentWeather(): Promise<WeatherData> {
    const response = await api.get<ApiResponse<{ weather: WeatherData }>>('/weather/current');
    return response.data.data!.weather;
  },
};
