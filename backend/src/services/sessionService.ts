import { eq, and, desc } from 'drizzle-orm';
import { db } from '../config/database';
import { chatSessions, messages, type ChatSession, type NewChatSession, type Message } from '../db/schema';
import { NotFoundError } from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export interface SessionWithMessages extends ChatSession {
  messages: Message[];
}

/**
 * Create a new chat session
 * @param userId - User ID
 * @param title - Session title (optional, can be generated later)
 * @returns Created session
 */
export async function createSession(userId: string, title?: string): Promise<ChatSession> {
  const newSession: NewChatSession = {
    userId,
    title: title || '新しいチャット',
  };

  const [session] = await db.insert(chatSessions).values(newSession).returning();

  if (!session) {
    throw new Error(ERROR_MESSAGES.chat.sessionCreateError);
  }

  return session;
}

/**
 * Get all sessions for a user
 * @param userId - User ID
 * @returns Array of sessions ordered by most recent
 */
export async function getUserSessions(userId: string): Promise<ChatSession[]> {
  const sessions = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.userId, userId))
    .orderBy(desc(chatSessions.updatedAt));

  return sessions;
}

/**
 * Get a specific session with messages
 * @param sessionId - Session ID
 * @param userId - User ID (for authorization)
 * @returns Session with messages
 */
export async function getSessionWithMessages(
  sessionId: string,
  userId: string
): Promise<SessionWithMessages> {
  // Get session and verify ownership
  const [session] = await db
    .select()
    .from(chatSessions)
    .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)))
    .limit(1);

  if (!session) {
    throw new NotFoundError(ERROR_MESSAGES.chat.sessionNotFound);
  }

  // Get messages for this session
  const sessionMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(messages.createdAt);

  return {
    ...session,
    messages: sessionMessages,
  };
}

/**
 * Update session title
 * @param sessionId - Session ID
 * @param userId - User ID (for authorization)
 * @param title - New title
 * @returns Updated session
 */
export async function updateSessionTitle(
  sessionId: string,
  userId: string,
  title: string
): Promise<ChatSession> {
  const [updatedSession] = await db
    .update(chatSessions)
    .set({ title, updatedAt: new Date() })
    .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)))
    .returning();

  if (!updatedSession) {
    throw new NotFoundError(ERROR_MESSAGES.chat.sessionNotFound);
  }

  return updatedSession;
}

/**
 * Delete a session and all its messages
 * @param sessionId - Session ID
 * @param userId - User ID (for authorization)
 */
export async function deleteSession(sessionId: string, userId: string): Promise<void> {
  const result = await db
    .delete(chatSessions)
    .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)))
    .returning();

  if (result.length === 0) {
    throw new NotFoundError(ERROR_MESSAGES.chat.sessionNotFound);
  }
}

/**
 * Get recent messages for a session (for AI context)
 * @param sessionId - Session ID
 * @param limit - Number of messages to fetch
 * @returns Array of recent messages
 */
export async function getRecentMessages(sessionId: string, limit: number = 10): Promise<Message[]> {
  const recentMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  // Reverse to get chronological order
  return recentMessages.reverse();
}
