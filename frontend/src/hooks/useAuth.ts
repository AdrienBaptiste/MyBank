import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';
import { loginRequest, registerRequest } from '../services/auth';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '../types/user';

export const useAuth = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      setError('');
      const token = await loginRequest(email, password);
      const decoded = jwtDecode<DecodedToken>(token);

      dispatch(loginAction({ user: { id: decoded.id, email: decoded.email, name: decoded.name }, token }));
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError('');
      await registerRequest(name, email, password);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return {
    login,
    register,
    logout,
    error,
    isAuthenticated,
    user,
    token,
  };
};
