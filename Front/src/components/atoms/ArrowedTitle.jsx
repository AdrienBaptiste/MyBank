// components/atoms/ArrowedTitle.jsx
import React from 'react';

const ArrowedTitle = ({ text }) => {
  return (
    <div className='login_titleBox'>
        <h1>{text}</h1>
        <svg width="79" height="54" viewBox="0 0 79 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="66" height="12" fill="#EC0B43" />
            <rect x="66" y="3" width="32" height="13" transform="rotate(90 66 3)" fill="#EC0B43" />
            <path d="M59.5 54L42.6125 24.75L76.3875 24.75L59.5 54Z" fill="#EC0B43" />
        </svg>
    </div>
  );
};

export default ArrowedTitle;
