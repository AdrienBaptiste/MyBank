// components/atoms/Image.jsx
import React from 'react';

const Image = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="Image" />
  );
};

export default Image;