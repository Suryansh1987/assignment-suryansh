import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authLimiter } from '../middlewares/rateLimiter';
import { signupSchema, signinSchema } from '../utils/validators';

const router = Router();

// Public routes with rate limiting
router.post('/signup', authLimiter, validateRequest(signupSchema), authController.signup);
router.post('/signin', authLimiter, validateRequest(signinSchema), authController.signin);

// Protected routes
router.get('/verify', authMiddleware, authController.verify);

export default router;
