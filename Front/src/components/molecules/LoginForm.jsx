// components/organisms/LoginForm.jsx
import { useState } from 'react';
import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ArrowedTitle from '../atoms/ArrowedTitle';

const LoginForm = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  return (
    <div className="userLogin">
      <ArrowedTitle text="Log in" />

      <Input className="portalInput" type="email" value={email} placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} required />

      <Input className="portalInput" type="password" value={password} placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} required />

      <Button className="portalBtn" type="submit" label="Log-in" onClick={onLogin} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;