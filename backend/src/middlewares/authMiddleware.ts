import { Request, Response, NextFunction } from 'express';
import { verifyToken, type JwtPayload } from '../utils/jwtHelper';
import { AuthenticationError } from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError(ERROR_MESSAGES.auth.unauthorized);
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.auth.tokenInvalid,
    });
  }
}
