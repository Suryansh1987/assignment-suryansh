import { Request, Response, NextFunction } from 'express';
import * as chatService from '../services/chatService';
import type { SendMessageInput } from '../utils/validators';

/**
 * Send message and get AI response controller
 * POST /api/chat/message
 */
export async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const input: SendMessageInput = req.body;

    const result = await chatService.sendMessage(userId, input.sessionId, input.content);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
