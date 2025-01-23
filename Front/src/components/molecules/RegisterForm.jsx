// components/organisms/RegisterForm.jsx
import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ArrowedTitle from '../atoms/ArrowedTitle';


const RegisterForm = ({ onRegister }) => {
    return (
        <div className="userRegister">
            <ArrowedTitle text="Register" />
            <Input className="portalInput" type="text" placeholder="First Name" />
            <Input className="portalInput" type="text" placeholder="Last Name" />
            <Input className="portalInput" type="text" placeholder="Email" />
            <Input className="portalInput" type="text" placeholder="Password" />
            <Button className="portalBtn" content="Register" onClick={onRegister} />
        </div>
    );
};

export default RegisterForm;