'use client';

// hooks/useAuth.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react';
import { User } from '../types/users';
import { PUBLIC_ROUTES } from '../constants/routes';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useLayoutEffect(() => {
    // if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    //   router.push('/login');
    // }
  }, [user, router]);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Not authenticated');
        const data: User = await res.json();
        setUser(data);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );
    if (!res.ok) {
      const err = await res.json();
      setLoading(false);
      throw new Error(err.message || 'Login failed');
    }
    const { token, user } = await res.json();
    localStorage.setItem('token', token);
    setUser(user);
    setLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
