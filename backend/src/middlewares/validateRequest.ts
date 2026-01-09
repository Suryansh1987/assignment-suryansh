import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

/**
 * Middleware factory to validate request body against a Zod schema
 * @param schema - Zod schema to validate against
 */
export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error); // Pass error to error handler
    }
  };
}

/**
 * Middleware factory to validate request params against a Zod schema
 * @param schema - Zod schema to validate against
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      next(error); // Pass error to error handler
    }
  };
}
