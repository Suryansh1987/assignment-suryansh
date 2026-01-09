import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UI_TEXT, PREFECTURES } from '../utils/constants';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    prefecture: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError(UI_TEXT.errors.required);
      return;
    }

    if (formData.password.length < 8) {
      setError(UI_TEXT.errors.passwordTooShort);
      return;
    }

    setLoading(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || UI_TEXT.errors.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-900 mb-2">
            AgriSense AI
          </h1>
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {UI_TEXT.auth.signup}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            日本の農家向けAIアシスタント
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">{error}</p>
              {error.includes('既に登録されています') && (
                <p className="mt-2 text-sm">
                  既にアカウントをお持ちの場合は、
                  <Link to="/signin" className="font-semibold underline hover:text-red-800">
                    こちらからログイン
                  </Link>
                  してください。
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label={UI_TEXT.auth.name}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="山田太郎"
            />

            <Input
              label={UI_TEXT.auth.email}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="example@email.com"
            />

            <Input
              label={UI_TEXT.auth.password}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="8文字以上"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {UI_TEXT.auth.prefecture}
              </label>
              <select
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">選択してください</option>
                {PREFECTURES.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label={UI_TEXT.auth.city}
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="横浜市"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {UI_TEXT.auth.signup}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">{UI_TEXT.auth.haveAccount} </span>
            <Link to="/signin" className="font-medium text-primary-600 hover:text-primary-500">
              {UI_TEXT.auth.signinLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
