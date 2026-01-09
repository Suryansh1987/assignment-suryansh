import { useState, useEffect } from 'react';
import { weatherService } from '../../services/weatherService';
import type { WeatherData } from '../../types/weather.types';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await weatherService.getCurrentWeather();
        setWeather(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || '天気情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('晴') || desc.includes('clear')) return '☀️';
    if (desc.includes('雨') || desc.includes('rain')) return '🌧️';
    if (desc.includes('雪') || desc.includes('snow')) return '❄️';
    if (desc.includes('曇') || desc.includes('cloud')) return '☁️';
    if (desc.includes('雷') || desc.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-center h-32">
          <LoadingSpinner size="md" />
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg p-6 text-white">
        <div className="text-center">
          <div className="text-5xl mb-2">🌍</div>
          <p className="text-sm">天気情報を取得できません</p>
          <p className="text-xs opacity-75 mt-1">プロフィールで地域を設定してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">現在の天気</h3>
        <div className="text-4xl">{getWeatherIcon(weather.description)}</div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">気温</span>
          <span className="text-2xl font-bold">{weather.temperature}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">湿度</span>
          <span className="text-lg font-semibold">{weather.humidity}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">降水量</span>
          <span className="text-lg font-semibold">{weather.rainfall}</span>
        </div>

        <div className="pt-3 border-t border-blue-400 border-opacity-30">
          <p className="text-sm text-center opacity-90">{weather.description}</p>
        </div>
      </div>
    </div>
  );
}
