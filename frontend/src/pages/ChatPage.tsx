import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { ChatContainer } from '../components/chat/ChatContainer';

export function ChatPage() {
  const { signout } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard">
              <h1 className="text-2xl font-bold text-gray-900">AgriSense AI</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <button className="text-gray-700 hover:text-gray-900 font-medium px-3 py-1 rounded transition-colors">
                  ダッシュボード
                </button>
              </Link>
              <Link to="/profile">
                <button className="text-gray-700 hover:text-gray-900 font-medium px-3 py-1 rounded transition-colors">
                  プロフィール
                </button>
              </Link>
              <Button variant="secondary" size="sm" onClick={signout}>
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}
