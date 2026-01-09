import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import type { SignupInput, SigninInput } from '../utils/validators';

/**
 * Signup controller
 * POST /api/auth/signup
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const input: SignupInput = req.body;
    const result = await authService.signup(input);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Signin controller
 * POST /api/auth/signin
 */
export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const input: SigninInput = req.body;
    const result = await authService.signin(input);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Verify token controller
 * GET /api/auth/verify
 */
export async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    // If we get here, the authMiddleware already verified the token
    const userId = req.user!.userId;
    const user = await authService.getUserById(userId);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}
