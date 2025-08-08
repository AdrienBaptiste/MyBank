// src/components/templates/HomeLayout.tsx
import React from 'react';
import UserPortal from '../organisms/UserPortal';

const HomeLayout: React.FC = () => {
  return (
    <section className="mainSection">
      <UserPortal />
    </section>
  );
};

export default HomeLayout;
