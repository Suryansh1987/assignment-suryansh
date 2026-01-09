import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import sessionRoutes from './sessionRoutes';
import chatRoutes from './chatRoutes';
import weatherRoutes from './weatherRoutes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/chat', chatRoutes);
router.use('/weather', weatherRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
