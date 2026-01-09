import { Router } from 'express';
import * as weatherController from '../controllers/weatherController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// All weather routes require authentication
router.use(authMiddleware);

router.get('/current', weatherController.getCurrentWeather);

export default router;
