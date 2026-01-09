import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorClasses';
import { ZodError } from 'zod';

/**
 * Global error handler middleware
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // Log error for debugging
  console.error('Error:', err);

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: '入力データが無効です',
      errors,
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: 'サーバーエラーが発生しました',
  });
}
