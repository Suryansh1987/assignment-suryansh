import api from './api';
import type { ApiResponse } from '../types/api.types';
import type {
  ChatSession,
  SessionWithMessages,
  SendMessageRequest,
  SendMessageResponse,
} from '../types/chat.types';

export const chatService = {
  /**
   * Create a new chat session
   */
  async createSession(title?: string): Promise<ChatSession> {
    const response = await api.post<ApiResponse<{ session: ChatSession }>>('/sessions', {
      title,
    });
    return response.data.data!.session;
  },

  /**
   * Get all user sessions
   */
  async getSessions(): Promise<ChatSession[]> {
    const response = await api.get<ApiResponse<{ sessions: ChatSession[] }>>('/sessions');
    return response.data.data!.sessions;
  },

  /**
   * Get session with messages
   */
  async getSessionWithMessages(sessionId: string): Promise<SessionWithMessages> {
    const response = await api.get<ApiResponse<{ session: SessionWithMessages }>>(
      `/sessions/${sessionId}`
    );
    return response.data.data!.session;
  },

  /**
   * Update session title
   */
  async updateSession(sessionId: string, title: string): Promise<ChatSession> {
    const response = await api.put<ApiResponse<{ session: ChatSession }>>(
      `/sessions/${sessionId}`,
      { title }
    );
    return response.data.data!.session;
  },

  /**
   * Delete session
   */
  async deleteSession(sessionId: string): Promise<void> {
    await api.delete(`/sessions/${sessionId}`);
  },

  /**
   * Send message and get AI response
   */
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await api.post<ApiResponse<SendMessageResponse>>('/chat/message', data);
    return response.data.data!;
  },
};
