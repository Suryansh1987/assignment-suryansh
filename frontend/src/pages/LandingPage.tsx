import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuthButtons={true} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Farm landscape"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-800/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                🌾 AgriSense AI
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-green-100">
                日本の農家向けAIアシスタント
              </p>
              <p className="text-lg md:text-xl mb-8 text-green-50 leading-relaxed">
                音声で質問、リアルタイム天気情報、そしてAIが提供する専門的な農業アドバイス。
                あなたの農業をスマートにサポートします。
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-white text-green-700 px-8 py-4 rounded-lg hover:bg-green-50 font-bold text-lg transition-all transform hover:scale-105 shadow-lg text-center"
                >
                  無料で始める →
                </Link>
                <Link
                  to="/signin"
                  className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 font-medium text-lg transition-all border-2 border-white text-center"
                >
                  ログイン
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Fresh vegetables"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-sm text-white font-semibold">作物管理</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌦️</div>
                      <p className="text-sm text-white font-semibold">天気予報</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <p className="text-sm text-white font-semibold">AI分析</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-sm text-white font-semibold">データ管理</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">農業の未来を変える</h2>
            <p className="text-xl text-gray-600">
              全国の農家が信頼するAIアシスタント
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
                alt="広大な農地"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">広大な農地管理</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
                alt="新鮮な作物"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">新鮮な収穫</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
                alt="田園風景"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">美しい田園</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src="https://plus.unsplash.com/premium_photo-1663945778994-11b3201882a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
                alt="最新農業技術"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">最新技術</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">主な機能</h2>
            <p className="text-xl text-gray-600">
              最新のAI技術で、あなたの農業をサポートします
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🎙️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">音声入力</h3>
              <p className="text-gray-700 leading-relaxed">
                日本語で話しかけるだけで、AIが質問に答えます。作業中でも手を使わずに操作可能です。
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🌦️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">リアルタイム天気</h3>
              <p className="text-gray-700 leading-relaxed">
                あなたの農地の天気情報をリアルタイムで取得し、最適な農作業のタイミングをアドバイスします。
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI農業アドバイス</h3>
              <p className="text-gray-700 leading-relaxed">
                Google Gemini AIによる専門的で実践的な農業アドバイス。作物、天気、農法に合わせた助言を提供します。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">チャット履歴</h3>
              <p className="text-gray-700 leading-relaxed">
                過去の会話を保存し、いつでも振り返ることができます。季節ごとのアドバイスを記録できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                こんな方におすすめ
              </h2>
              <div className="space-y-4">
                <div className="flex items-start bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl mr-4">🌤️</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      天気に応じた農作業
                    </h3>
                    <p className="text-gray-600">
                      天気予報を基に、最適な作業タイミングをアドバイスします
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl mr-4">🐛</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      病害虫対策
                    </h3>
                    <p className="text-gray-600">
                      専門的な助言で、作物を病気や害虫から守ります
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl mr-4">🌿</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      有機農法・減農薬栽培
                    </h3>
                    <p className="text-gray-600">
                      環境に優しい農業方法についてのアドバイスを提供
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl mr-4">📈</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      収穫量の向上
                    </h3>
                    <p className="text-gray-600">
                      データに基づいた栽培方法で、収穫量を最大化
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">🌾🚜🌱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  今すぐ始めましょう
                </h3>
                <p className="text-gray-600">
                  無料で登録して、AIアシスタントを体験
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <p className="text-gray-700">アカウントを無料で作成</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <p className="text-gray-700">農地情報と作物を登録</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <p className="text-gray-700">AIアシスタントに質問開始</p>
                </div>
              </div>

              <Link
                to="/signup"
                className="block w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 font-bold text-lg transition-all text-center mt-6"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            スマート農業を今日から始めませんか？
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            AIがあなたの農業パートナーとして、24時間365日サポートします
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-700 px-10 py-4 rounded-lg hover:bg-green-50 font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            無料アカウントを作成 →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
