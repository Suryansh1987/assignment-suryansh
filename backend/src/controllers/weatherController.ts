import { Request, Response, NextFunction } from 'express';
import * as weatherService from '../services/weatherService';
import * as userService from '../services/userService';

/**
 * Get current weather for user's location controller
 * GET /api/weather/current
 */
export async function getCurrentWeather(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;

    // Get user profile to get location
    const user = await userService.getUserProfile(userId);

    if (!user.city) {
      return res.status(400).json({
        success: false,
        message: 'プロフィールに地域情報が設定されていません',
      });
    }

    const weather = await weatherService.getCurrentWeather(user.city, user.prefecture || undefined);

    res.status(200).json({
      success: true,
      data: { weather },
    });
  } catch (error) {
    next(error);
  }
}
