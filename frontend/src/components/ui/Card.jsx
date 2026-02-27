import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-blue-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;