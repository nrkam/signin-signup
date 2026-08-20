import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import type { ReactNode } from 'react';  // ← добавь эту строку

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;