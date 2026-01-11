import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UI_TEXT } from '../utils/constants';

export function SigninPage() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(UI_TEXT.errors.required);
      return;
    }

    setLoading(true);

    try {
      await signin(formData);
      navigate('/dashboard');
      // Don't set loading to false here - component is unmounting
    } catch (err: any) {
      setError(err.message || UI_TEXT.errors.serverError);
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
            {UI_TEXT.auth.signin}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            日本の農家向けAIアシスタント
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
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
              placeholder="パスワード"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {UI_TEXT.auth.signin}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">{UI_TEXT.auth.noAccount} </span>
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              {UI_TEXT.auth.signupLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
