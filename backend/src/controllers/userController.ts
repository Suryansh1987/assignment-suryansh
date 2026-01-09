import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import type { UpdateProfileInput } from '../utils/validators';

/**
 * Get user profile controller
 * GET /api/users/profile
 */
export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const user = await userService.getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update user profile controller
 * PUT /api/users/profile
 */
export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const input: UpdateProfileInput = req.body;
    const user = await userService.updateUserProfile(userId, input);

    res.status(200).json({
      success: true,
      data: { user },
      message: 'プロフィールを更新しました',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user account controller
 * DELETE /api/users/account
 */
export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    await userService.deleteUserAccount(userId);

    res.status(200).json({
      success: true,
      message: 'アカウントを削除しました',
    });
  } catch (error) {
    next(error);
  }
}
