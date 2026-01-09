import { Router } from 'express';
import * as chatController from '../controllers/chatController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { sendMessageSchema } from '../utils/validators';

const router = Router();

// All chat routes require authentication
router.use(authMiddleware);

router.post('/message', validateRequest(sendMessageSchema), chatController.sendMessage);

export default router;
