import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { UI_TEXT } from '../utils/constants';

export function DashboardPage() {
  const { user, loading, signout } = useAuth();

  // Show loading state while authentication is being verified
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">AgriSense AI</h2>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated (shouldn't happen with ProtectedRoute, but safety check)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌾</div>
              <h1 className="text-2xl font-bold text-primary-600">AgriSense AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                👤 {user?.name}さん
              </Link>
              <button
                onClick={signout}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {UI_TEXT.auth.signout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {UI_TEXT.dashboard.welcome}{user?.name}さん 👋
              </h2>
              <p className="text-xl text-green-100">
                今日も素晴らしい農作業を！AIがサポートします
              </p>
            </div>
            <div className="hidden md:block text-7xl">🚜</div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Start Chat Card */}
          <Link to="/chat" className="block group">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white h-full hover:shadow-xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">AIチャット</h3>
                <div className="text-5xl">💬</div>
              </div>
              <p className="text-white/90 mb-4">
                農業に関する質問をAIアシスタントに相談しましょう
              </p>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center font-semibold group-hover:bg-white/30 transition-colors">
                チャットを開始 →
              </div>
            </div>
          </Link>

          {/* Profile Card */}
          <Link to="/profile" className="block group">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full hover:shadow-xl transition-all border-2 border-gray-100 hover:border-primary-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">プロフィール</h3>
                <div className="text-5xl">👤</div>
              </div>
              <div className="space-y-2 text-gray-700 mb-4">
                {user?.city && user?.prefecture ? (
                  <p className="flex items-center">
                    <span className="text-2xl mr-2">📍</span>
                    {user.prefecture}{user.city}
                  </p>
                ) : (
                  <p className="text-orange-600 text-sm">⚠️ 地域情報を設定してください</p>
                )}
                {user?.farmSize && (
                  <p className="flex items-center">
                    <span className="text-2xl mr-2">🌾</span>
                    農地: {user.farmSize}
                  </p>
                )}
                {user?.cropTypes && user.cropTypes.length > 0 && (
                  <p className="flex items-center">
                    <span className="text-2xl mr-2">🌱</span>
                    {user.cropTypes.slice(0, 2).join(', ')}
                    {user.cropTypes.length > 2 && ` +${user.cropTypes.length - 2}`}
                  </p>
                )}
              </div>
              <div className="text-primary-600 font-semibold group-hover:text-primary-700">
                編集する →
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">⚡</span>
            クイックアクション
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/chat">
              <button className="w-full bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg p-6 text-left transition-all transform hover:scale-105 shadow-sm hover:shadow-md">
                <div className="text-4xl mb-3">🎙️</div>
                <h4 className="font-bold text-gray-900 mb-1">音声で質問</h4>
                <p className="text-sm text-gray-600">
                  マイクで話して即座に質問
                </p>
              </button>
            </Link>

            <Link to="/chat">
              <button className="w-full bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg p-6 text-left transition-all transform hover:scale-105 shadow-sm hover:shadow-md">
                <div className="text-4xl mb-3">📝</div>
                <h4 className="font-bold text-gray-900 mb-1">新しいチャット</h4>
                <p className="text-sm text-gray-600">
                  新しい会話を開始する
                </p>
              </button>
            </Link>

            <Link to="/chat">
              <button className="w-full bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg p-6 text-left transition-all transform hover:scale-105 shadow-sm hover:shadow-md">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-bold text-gray-900 mb-1">チャット履歴</h4>
                <p className="text-sm text-gray-600">
                  過去の会話を確認する
                </p>
              </button>
            </Link>

            <Link to="/profile">
              <button className="w-full bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg p-6 text-left transition-all transform hover:scale-105 shadow-sm hover:shadow-md">
                <div className="text-4xl mb-3">⚙️</div>
                <h4 className="font-bold text-gray-900 mb-1">設定</h4>
                <p className="text-sm text-gray-600">
                  プロフィールと設定を編集
                </p>
              </button>
            </Link>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">AgriSense AIの機能</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all">
                <div className="text-5xl mb-3">🎙️</div>
                <h4 className="font-bold text-lg mb-2">音声入力対応</h4>
                <p className="text-sm text-green-100">
                  日本語で自然に話しかけるだけでOK
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all">
                <div className="text-5xl mb-3">🌦️</div>
                <h4 className="font-bold text-lg mb-2">リアルタイム天気</h4>
                <p className="text-sm text-green-100">
                  あなたの地域の最新天気情報
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all">
                <div className="text-5xl mb-3">🤖</div>
                <h4 className="font-bold text-lg mb-2">AI農業アドバイス</h4>
                <p className="text-sm text-green-100">
                  作物や天気に合わせた専門的助言
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all">
                <div className="text-5xl mb-3">💾</div>
                <h4 className="font-bold text-lg mb-2">会話履歴保存</h4>
                <p className="text-sm text-green-100">
                  過去のアドバイスをいつでも確認
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            使い方のヒント
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. プロフィールを設定</h4>
              <p className="text-sm text-gray-700">
                地域、作物、農法を登録すると、より正確なアドバイスが受けられます
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. 具体的に質問</h4>
              <p className="text-sm text-gray-700">
                「トマトの水やりの頻度は？」など具体的に聞くと詳しい回答が得られます
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. 履歴を活用</h4>
              <p className="text-sm text-gray-700">
                季節ごとのアドバイスを保存して、来年の参考にしましょう
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
