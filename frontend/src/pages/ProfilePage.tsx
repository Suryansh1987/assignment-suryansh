import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UI_TEXT, CROP_TYPES, FARMING_METHODS, PREFECTURES } from '../utils/constants';

export function ProfilePage() {
  const { user, signout, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    city: user?.city || '',
    prefecture: user?.prefecture || '',
    farmSize: user?.farmSize || '',
    cropTypes: user?.cropTypes || [],
    farmingMethods: user?.farmingMethods || [],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const updatedUser = await userService.updateProfile(formData);
      updateUser(updatedUser);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || UI_TEXT.errors.serverError);
    } finally {
      setLoading(false);
    }
  };

  const toggleCropType = (crop: string) => {
    setFormData((prev) => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter((c) => c !== crop)
        : [...prev.cropTypes, crop],
    }));
  };

  const toggleFarmingMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      farmingMethods: prev.farmingMethods.includes(method)
        ? prev.farmingMethods.filter((m) => m !== method)
        : [...prev.farmingMethods, method],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard">
              <h1 className="text-2xl font-bold text-gray-900">AgriSense AI</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  ダッシュボード
                </Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={signout}>
                {UI_TEXT.auth.signout}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {UI_TEXT.profile.title}
          </h2>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {UI_TEXT.profile.updateSuccess}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label={UI_TEXT.auth.name}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {UI_TEXT.auth.prefecture}
                </label>
                <select
                  value={formData.prefecture}
                  onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
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
              />

              <Input
                label={UI_TEXT.profile.farmSize}
                type="text"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                placeholder="例: 2ha"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {UI_TEXT.profile.cropTypes}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CROP_TYPES.map((crop) => (
                    <label key={crop.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.cropTypes.includes(crop.value)}
                        onChange={() => toggleCropType(crop.value)}
                        className="mr-2"
                      />
                      {crop.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {UI_TEXT.profile.farmingMethods}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FARMING_METHODS.map((method) => (
                    <label key={method.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.farmingMethods.includes(method.value)}
                        onChange={() => toggleFarmingMethod(method.value)}
                        className="mr-2"
                      />
                      {method.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              {UI_TEXT.profile.saveChanges}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
