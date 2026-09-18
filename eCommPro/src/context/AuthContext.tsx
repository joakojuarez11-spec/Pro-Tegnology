/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as authService from '../services/authService';

interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (nombre: string, email: string, password: string) => AuthResult;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const result = authService.login(email, password);
    if (result.success) {
      setUser(result.user ?? null);
    }
    return result;
  };

  const register = (nombre: string, email: string, password: string) => {
    const result = authService.register(nombre, email, password);
    if (result.success) {
      setUser(result.user ?? null);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isLoggedIn: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
