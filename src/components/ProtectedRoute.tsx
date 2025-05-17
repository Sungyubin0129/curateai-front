// src/components/ProtectedRoute.tsx
import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useContext(AuthContext);
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
