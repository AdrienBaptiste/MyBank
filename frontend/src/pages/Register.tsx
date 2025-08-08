import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/molecules/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';

const Register: React.FC = () => {
  const { register, error } = useAuth();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  // Si déjà connecté → redirige vers dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <RegisterForm onRegister={register} />
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Register;
