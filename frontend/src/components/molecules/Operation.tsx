// components/organisms/Operation.tsx
import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Image from '../atoms/Image';

interface OperationProps {
  label: string;
  amount: number;
  category: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Operation: React.FC<OperationProps> = ({ label, amount, category, date, onEdit, onDelete }) => {
  const handleCheck = () => {
    console.log("CHECKED");
  };

  return (
    <div className="operation">
      <div className="operation-infos">
        <Input className="operation_checkbox" type="checkbox" onChange={handleCheck} />
        <h3><span className={`operation-value ${amount >= 0 ? 'positiveValue' : 'negativeValue'}`}>{amount}€</span> - {label}</h3>
      </div>
      <div className="operation-manage">
        <h3>{category} - {date}</h3>
        <Button className="operation_manage_btn" content={<Image src="../../assets/pencil.svg" alt="edit" />} onClick={onEdit} />
        <Button className="operation-manage_btn" content={<Image src="../../assets/trash.svg" alt="delete" />} onClick={onDelete} />
      </div>
    </div>
  );
};

export default Operation;
