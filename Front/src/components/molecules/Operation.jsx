// components/organisms/Operation.jsx
import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const handleCheck = () => {
    console.log("CHECKED");
}

const Operation = ({onEdit, onDelete }) => {
    return (
        <div className="operation">
            <div className="operation-infos"> 
                <Input className="operation_checkbox" type="checkbox" onChange={handleCheck} />
                <h3><span className="operation-value positiveValue">+705€</span>   -   Operation Name</h3>
            </div>

            <div className="operation-manage">
                <h3>Catégorie   -   21 / 01 / 2025</h3>
                <Button className="operation_manage_btn" 
                    content={<Image src="../../assets/pencil.svg"/>} 
                    onClick={onEdit} 
                />
                <Button className="operation-manage_btn" 
                    content={<Image src="../../assets/trash.svg"/>} 
                    onClick={onDelete} 
                />
            </div>
        </div>
    );
};

export default Operation;