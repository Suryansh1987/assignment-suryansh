import rateLimit from 'express-rate-limit';
import { config } from '../config/env';

/**
 * Rate limiter for API routes
 * Limits requests per IP address
 */
export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'リクエストが多すぎます。しばらくしてからもう一度お試しください。',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Stricter rate limiter for auth routes
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'ログイン試行回数が多すぎます。しばらくしてからもう一度お試しください。',
  standardHeaders: true,
  legacyHeaders: false,
});
