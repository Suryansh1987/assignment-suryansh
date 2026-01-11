import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const { user, loading } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🌾</div>
            <span className="text-2xl font-bold text-primary-600">AgriSense AI</span>
          </Link>

          {showAuthButtons && !loading && (
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 font-medium">
                    👤 {user.name}さん
                  </span>
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    ダッシュボード
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    ログイン
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    無料で始める
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
