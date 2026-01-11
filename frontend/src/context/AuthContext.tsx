import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, SignupData, SigninData } from '../types/auth.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (data: SigninData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  signout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize - check if user is logged in
  useEffect(() => {
    console.log('[AuthContext] useEffect initAuth starting');
    const initAuth = async () => {
      const token = authService.getToken();
      console.log('[AuthContext] Token exists:', !!token);
      if (token) {
        // Check if user is already in localStorage (just logged in)
        const cachedUser = authService.getUser();
        console.log('[AuthContext] Cached user exists:', !!cachedUser);
        if (cachedUser) {
          // User just logged in, use cached data immediately
          console.log('[AuthContext] Using cached user:', cachedUser);
          setUser(cachedUser);
          setLoading(false);
          return;
        }

        // Otherwise verify with server
        try {
          console.log('[AuthContext] Verifying token with server');
          const user = await authService.verify();
          console.log('[AuthContext] Server verification success:', user);
          setUser(user);
        } catch (error) {
          console.error('[AuthContext] Verification failed:', error);
          authService.clearAuth();
        }
      }
      console.log('[AuthContext] Setting loading to false');
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (data: SignupData) => {
    console.log('[AuthContext] Signup starting');
    const { user, token } = await authService.signup(data);
    console.log('[AuthContext] Signup success, user:', user);
    authService.saveAuth(token, user);
    console.log('[AuthContext] Auth saved to localStorage');
    setUser(user);
    console.log('[AuthContext] User state updated');
    setLoading(false);
    console.log('[AuthContext] Loading set to false');
  };

  const signin = async (data: SigninData) => {
    console.log('[AuthContext] Signin starting');
    const { user, token } = await authService.signin(data);
    console.log('[AuthContext] Signin success, user:', user);
    authService.saveAuth(token, user);
    console.log('[AuthContext] Auth saved to localStorage');
    setUser(user);
    console.log('[AuthContext] User state updated');
    setLoading(false);
    console.log('[AuthContext] Loading set to false');
  };

  const signout = () => {
    authService.clearAuth();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
