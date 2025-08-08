// components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  content: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ content, onClick, type = 'button', className }) => {
  return (
    <button onClick={onClick} type={type} className={className ? className : 'Button'}>
      {content}
    </button>
  );
};

export default Button;
