import axios from 'axios';
import { db } from '../config/database';
import { weatherLogs, type NewWeatherLog } from '../db/schema';
import { config } from '../config/env';
import { InternalServerError } from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export interface WeatherData {
  temperature: string;
  humidity: string;
  condition: string;
  description: string;
  rainfall: string;
}

/**
 * Get current weather for a location
 * @param city - City name in Japanese
 * @param prefecture - Prefecture name in Japanese (optional)
 * @returns Weather data
 */
export async function getCurrentWeather(
  city: string,
  prefecture?: string
): Promise<WeatherData> {
  try {
    // Validate city name (must be at least 2 characters)
    if (!city || city.trim().length < 2) {
      throw new InternalServerError('有効な市区町村名を入力してください');
    }

    // Build query string
    const query = prefecture ? `${city},${prefecture},JP` : `${city},JP`;

    // Call OpenWeatherMap API
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: query,
        appid: config.openWeather.apiKey,
        units: 'metric',
        lang: 'ja',
      },
      timeout: 5000,
    });

    const data = response.data;

    // Extract weather information
    const weatherData: WeatherData = {
      temperature: `${Math.round(data.main.temp)}°C`,
      humidity: `${data.main.humidity}%`,
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      rainfall: data.rain?.['1h'] ? `${data.rain['1h']}mm` : '0mm',
    };

    // Log weather data to database (async, don't await)
    saveWeatherLog(city, prefecture, weatherData).catch((error) => {
      console.error('Failed to save weather log:', error);
    });

    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new InternalServerError('指定された地域の天気情報が見つかりません');
      }
    }

    throw new InternalServerError(ERROR_MESSAGES.weather.fetchError);
  }
}

/**
 * Save weather data to logs table
 * @param city - City name
 * @param prefecture - Prefecture name
 * @param weatherData - Weather data to save
 */
async function saveWeatherLog(
  city: string,
  prefecture: string | undefined,
  weatherData: WeatherData
): Promise<void> {
  const log = {
    city,
    prefecture,
    temperature: weatherData.temperature,
    humidity: weatherData.humidity,
    rainfall: weatherData.rainfall,
    weatherCondition: mapWeatherCondition(weatherData.condition),
    description: weatherData.description,
  } as any;

  await db.insert(weatherLogs).values(log);
}

/**
 * Map weather condition string to enum
 */
function mapWeatherCondition(condition: string) {
  const conditionMap: Record<string, any> = {
    clear: 'clear',
    clouds: 'clouds',
    rain: 'rain',
    snow: 'snow',
    thunderstorm: 'thunderstorm',
    drizzle: 'drizzle',
    mist: 'mist',
    fog: 'fog',
  };

  return conditionMap[condition.toLowerCase()] || 'clouds';
}
