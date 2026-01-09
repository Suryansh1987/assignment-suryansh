import cors, { CorsOptions } from 'cors';
import { config } from '../config/env';

/**
 * CORS configuration
 */
export const corsOptions: CorsOptions = {
  origin: config.frontendUrl,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);
