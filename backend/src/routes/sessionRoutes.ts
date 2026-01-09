import { Router } from 'express';
import * as sessionController from '../controllers/sessionController';
import { validateRequest, validateParams } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createSessionSchema, sessionIdSchema } from '../utils/validators';

const router = Router();

// All session routes require authentication
router.use(authMiddleware);

router.post('/', validateRequest(createSessionSchema), sessionController.createSession);
router.get('/', sessionController.getUserSessions);
router.get('/:id', validateParams(sessionIdSchema), sessionController.getSessionWithMessages);
router.put('/:id', validateParams(sessionIdSchema), sessionController.updateSession);
router.delete('/:id', validateParams(sessionIdSchema), sessionController.deleteSession);

export default router;
