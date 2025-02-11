'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // ✅ Load authentication state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // ✅ Save state
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // ✅ Clear state
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
