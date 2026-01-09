import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateProfileSchema } from '../utils/validators';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/profile', validateRequest(updateProfileSchema), userController.updateProfile);
router.delete('/account', userController.deleteAccount);

export default router;
