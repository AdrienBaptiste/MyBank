import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/molecules/LoginForm';
import { useAppSelector } from '../store/hooks';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login, error } = useAuth();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <LoginForm onLogin={login} />
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
