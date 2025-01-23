// components/templates/HomeLayout.jsx
import React from 'react';
import UserPortal from '../organisms/UserPortal';
import OperationList from '../organisms/OperationList';

const HomeLayout = () => {
  return (
    <section className="mainSection">
      
        <UserPortal />
    </section>
  );
};

export default HomeLayout;