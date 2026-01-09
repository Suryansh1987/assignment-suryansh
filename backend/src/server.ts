import express, { Application } from 'express';
import { corsMiddleware } from './middlewares/corsConfig';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

/**
 * Create and configure Express application
 */
export function createServer(): Application {
  const app = express();

  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS middleware
  app.use(corsMiddleware);

  // Rate limiting
  app.use('/api', apiLimiter);

  // API routes
  app.use('/api', routes);

  // Root route
  app.get('/', (req, res) => {
    res.json({
      message: 'AgriSense AI API',
      version: '1.0.0',
      status: 'running',
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'エンドポイントが見つかりません',
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
