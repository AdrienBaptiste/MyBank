// components/organisms/OperationList.jsx
import React from 'react';
import Operation from '../molecules/Operation';


const OperationList = () => {
    return (
        <div className="OperationList">
            <Operation />
            <Operation />
            <Operation />
            <Operation />
        </div>
    );
};



export default OperationList;