// components/atoms/Input.jsx
import React from 'react';

const Input = ({ placeholder, type, value, onChange }) => {
    return (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
    );
};

export default Input;