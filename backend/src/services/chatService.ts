import { eq } from 'drizzle-orm';
import { db } from '../config/database';
import { messages, type NewMessage, type Message } from '../db/schema';
import { generateAIResponse, generateSessionTitle, type ChatContext } from './geminiService';
import { getCurrentWeather } from './weatherService';
import { getUserProfile } from './userService';
import { getRecentMessages, updateSessionTitle } from './sessionService';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export interface SendMessageResponse {
  userMessage: Message;
  aiResponse: Message;
}

/**
 * Send a message and get AI response
 * @param userId - User ID
 * @param sessionId - Session ID
 * @param content - Message content
 * @returns User message and AI response
 */
export async function sendMessage(
  userId: string,
  sessionId: string,
  content: string
): Promise<SendMessageResponse> {
  // Get user profile
  const userProfile = await getUserProfile(userId);

  // Get current weather if user has location set
  let currentWeather;
  if (userProfile.city) {
    try {
      currentWeather = await getCurrentWeather(userProfile.city, userProfile.prefecture || undefined);
    } catch (error) {
      console.error('Failed to fetch weather, continuing without it:', error);
    }
  }

  // Get conversation history (last 10 messages)
  const conversationHistory = await getRecentMessages(sessionId, 10);

  // Check if this is the first message in the session
  const isFirstMessage = conversationHistory.length === 0;

  // Build context for AI
  const context: ChatContext = {
    userProfile: {
      name: userProfile.name,
      city: userProfile.city || undefined,
      prefecture: userProfile.prefecture || undefined,
      farmSize: userProfile.farmSize || undefined,
      cropTypes: userProfile.cropTypes || undefined,
      farmingMethods: userProfile.farmingMethods || undefined,
    },
    currentWeather,
    conversationHistory,
    currentQuestion: content,
  };

  // Generate AI response
  const aiResponseText = await generateAIResponse(context);

  // Save user message
  const userMessageData: NewMessage = {
    sessionId,
    role: 'user',
    content,
  };

  const [userMessage] = await db.insert(messages).values(userMessageData).returning();

  // Save AI response
  const aiMessageData: NewMessage = {
    sessionId,
    role: 'assistant',
    content: aiResponseText,
  };

  const [aiMessage] = await db.insert(messages).values(aiMessageData).returning();

  // If this is the first message, generate and update session title
  if (isFirstMessage) {
    try {
      const title = await generateSessionTitle(content);
      await updateSessionTitle(sessionId, userId, title);
    } catch (error) {
      console.error('Failed to generate session title:', error);
    }
  }

  if (!userMessage || !aiMessage) {
    throw new Error(ERROR_MESSAGES.chat.aiError);
  }

  return {
    userMessage,
    aiResponse: aiMessage,
  };
}

/**
 * Delete a specific message
 * @param messageId - Message ID
 */
export async function deleteMessage(messageId: string): Promise<void> {
  await db.delete(messages).where(eq(messages.id, messageId));
}
