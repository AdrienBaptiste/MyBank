// components/organisms/UserPortal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../molecules/LoginForm';
import RegisterForm from '../molecules/RegisterForm';

let loggedIn = false;

const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;

      // Stocke le token JWT dans localStorage
      localStorage.setItem('authToken', token);

      // Effectuer une redirection ou afficher un message de succès
      console.log('Token JWT:', token);
    } catch (error) {
      setError('Invalid credentials');
      console.error('Erreur d\'authentification', error);
    }
  };

const handleRegister = () => {
  loggedIn = true;
};

const UserPortal = () => {
    return (
        <div className="UserPortal">
            <LoginForm onLogin={handleLogin} />
            <RegisterForm onRegister={handleRegister} />
        </div>
    );
};



export default UserPortal;