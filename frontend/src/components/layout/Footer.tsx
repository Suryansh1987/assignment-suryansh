import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl">🌾</div>
              <span className="text-xl font-bold text-white">AgriSense AI</span>
            </div>
            <p className="text-sm text-gray-400">
              日本の農家のための次世代AIアシスタント
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">製品</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  無料で始める
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  機能
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  AgriSenseについて
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  ヘルプセンター
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  よくある質問
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">法的情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  利用規約
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} AgriSense AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
