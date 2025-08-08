// src/components/organisms/UserPortal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../molecules/LoginForm';
import RegisterForm from '../molecules/RegisterForm';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '../../types/user';

const UserPortal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      const decodedUser = jwtDecode<DecodedToken>(token);

      // Stocker le token + user dans le store
      dispatch(login({ user: { id: decodedUser.id, email: decodedUser.email, name: decodedUser.name }, token }));
      localStorage.setItem('token', token);
      console.log('Login success');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });
      console.log('Register success, you can now log in');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <div className="UserPortal flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
      <LoginForm onLogin={handleLogin} />
      <RegisterForm onRegister={handleRegister} />
      {error && <p className="error text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default UserPortal;
