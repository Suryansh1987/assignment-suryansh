import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/sessionService';
import type { CreateSessionInput, SessionIdInput } from '../utils/validators';

/**
 * Create new session controller
 * POST /api/sessions
 */
export async function createSession(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const input: CreateSessionInput = req.body;
    const session = await sessionService.createSession(userId, input.title);

    res.status(201).json({
      success: true,
      data: { session },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all user sessions controller
 * GET /api/sessions
 */
export async function getUserSessions(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const sessions = await sessionService.getUserSessions(userId);

    res.status(200).json({
      success: true,
      data: { sessions },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get session with messages controller
 * GET /api/sessions/:id
 */
export async function getSessionWithMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const session = await sessionService.getSessionWithMessages(id, userId);

    res.status(200).json({
      success: true,
      data: { session },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update session title controller
 * PUT /api/sessions/:id
 */
export async function updateSession(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { title } = req.body;
    const session = await sessionService.updateSessionTitle(id, userId, title);

    res.status(200).json({
      success: true,
      data: { session },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete session controller
 * DELETE /api/sessions/:id
 */
export async function deleteSession(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    await sessionService.deleteSession(id, userId);

    res.status(200).json({
      success: true,
      message: 'セッションを削除しました',
    });
  } catch (error) {
    next(error);
  }
}
