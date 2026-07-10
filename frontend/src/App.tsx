import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={isAuth ? '/dashboard' : '/register'} />} />
    </Routes>
  );
}

export default App;