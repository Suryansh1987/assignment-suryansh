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
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const user = await authService.verify();
          setUser(user);
        } catch (error) {
          authService.clearAuth();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (data: SignupData) => {
    const { user, token } = await authService.signup(data);
    authService.saveAuth(token, user);
    setUser(user);
  };

  const signin = async (data: SigninData) => {
    const { user, token } = await authService.signin(data);
    authService.saveAuth(token, user);
    setUser(user);
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
