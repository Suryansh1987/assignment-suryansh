import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  console.log('[ProtectedRoute] Render - loading:', loading, 'user:', !!user);

  if (loading) {
    console.log('[ProtectedRoute] Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    console.log('[ProtectedRoute] No user, redirecting to signin');
    return <Navigate to="/signin" replace />;
  }

  console.log('[ProtectedRoute] User authenticated, rendering children');
  return <>{children}</>;
}
