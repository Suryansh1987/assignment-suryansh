import { useEffect, useRef } from 'react';
import { Message } from './Message';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Message as MessageType } from '../../types/chat.types';

interface MessageListProps {
  messages: MessageType[];
  loading?: boolean;
}

export function MessageList({ messages, loading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-lg">新しいチャットを開始しましょう</p>
          <p className="text-sm mt-2">
            農業に関する質問を入力するか、音声で話しかけてください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <LoadingSpinner size="sm" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
