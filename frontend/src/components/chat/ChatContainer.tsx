import { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import { SessionSidebar } from './SessionSidebar';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import type { ChatSession, Message } from '../../types/chat.types';

export function ChatContainer() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Load messages when active session changes
  useEffect(() => {
    if (activeSession) {
      loadMessages(activeSession);
    } else {
      setMessages([]);
    }
  }, [activeSession]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await chatService.getSessions();
      setSessions(data);
      if (data.length > 0 && !activeSession) {
        setActiveSession(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'セッションの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      setLoading(true);
      const session = await chatService.getSessionWithMessages(sessionId);
      setMessages(session.messages);
    } catch (err: any) {
      setError(err.message || 'メッセージの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = async () => {
    try {
      setLoading(true);
      const newSession = await chatService.createSession();
      setSessions([newSession, ...sessions]);
      setActiveSession(newSession.id);
      setMessages([]);
    } catch (err: any) {
      setError(err.message || 'セッションの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSession(sessionId);
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await chatService.deleteSession(sessionId);
      setSessions(sessions.filter((s) => s.id !== sessionId));
      if (activeSession === sessionId) {
        const remainingSessions = sessions.filter((s) => s.id !== sessionId);
        setActiveSession(remainingSessions.length > 0 ? remainingSessions[0].id : null);
      }
    } catch (err: any) {
      setError(err.message || 'セッションの削除に失敗しました');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeSession) {
      // Create new session if none exists
      await handleNewSession();
      // Wait a bit for the session to be created
      setTimeout(() => handleSendMessage(content), 500);
      return;
    }

    try {
      setSendingMessage(true);
      setError(null);

      const response = await chatService.sendMessage({
        sessionId: activeSession,
        content,
      });

      // Add both user message and AI response to the messages list
      setMessages((prev) => [...prev, response.userMessage, response.aiResponse]);

      // Update session list to reflect latest activity
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSession
            ? { ...session, updatedAt: new Date().toISOString() }
            : session
        )
      );
    } catch (err: any) {
      setError(err.message || 'メッセージの送信に失敗しました');
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="flex h-full">
      <SessionSidebar
        sessions={sessions}
        activeSessionId={activeSession}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        loading={loading}
      />

      <div className="flex-1 flex flex-col">
        {error && (
          <div className="bg-red-50 border-b border-red-200 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {activeSession ? (
          <>
            <MessageList messages={messages} loading={sendingMessage} />
            <ChatInput onSendMessage={handleSendMessage} disabled={sendingMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                AgriSense AI へようこそ
              </h2>
              <p className="text-gray-600 mb-6">
                新しいチャットを開始して、農業に関する質問をしてみましょう
              </p>
              <button
                onClick={handleNewSession}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                + 新しいチャット
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
