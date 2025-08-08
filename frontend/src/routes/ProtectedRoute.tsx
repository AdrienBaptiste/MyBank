// ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

  // Attendre l'hydratation si un token existe mais Redux n'est pas encore authentifié
  if (!isAuthenticated && hasToken) {
    return <div className="p-4 text-center text-gray-600">Chargement...</div>;
  }

  return isAuthenticated ? children : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;