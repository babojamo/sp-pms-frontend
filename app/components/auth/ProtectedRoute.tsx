'use client';

// components/ProtectedRoute.js
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface ProtectedRouteProps {
  children: any;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = false;

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login page
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
