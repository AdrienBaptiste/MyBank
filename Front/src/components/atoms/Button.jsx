// components/atoms/Button.jsx
import React from 'react';

const Button = ({ label, onClick, type }) => {
  return (
    <button onClick={onClick} type={type} className="Button">
      {label}
    </button>
  );
};

export default Button;