import { useState } from 'react';
import type { ChatSession } from '../../types/chat.types';
import { UI_TEXT } from '../../utils/constants';

interface SessionSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  loading?: boolean;
}

export function SessionSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  loading,
}: SessionSidebarProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteConfirmId === sessionId) {
      onDeleteSession(sessionId);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(sessionId);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewSession}
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          + {UI_TEXT.chat.newChat}
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            {UI_TEXT.chat.noSessions}
          </div>
        ) : (
          <div className="py-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`px-4 py-3 cursor-pointer transition-colors relative group ${
                  activeSessionId === session.id
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(session.updatedAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(session.id, e)}
                    className="ml-2 p-1 rounded hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title={
                      deleteConfirmId === session.id
                        ? UI_TEXT.chat.confirmDelete
                        : UI_TEXT.chat.deleteSession
                    }
                  >
                    {deleteConfirmId === session.id ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
