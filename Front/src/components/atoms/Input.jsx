// components/atoms/Input.jsx
import React from 'react';

const Input = ({ placeholder, type, value, onChange, checked }) => {
    return (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} checked={checked} />
    );
};

export default Input;