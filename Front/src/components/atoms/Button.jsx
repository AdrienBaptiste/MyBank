// components/atoms/Button.jsx
import React from 'react';

const Button = ({ content, onClick, type }) => {
  return (
    <button onClick={onClick} type={type} className="Button">
      {content}
    </button>
  );
};

export default Button;