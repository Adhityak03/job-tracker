import React from 'react';

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  ghost: 'bg-white border text-gray-700 hover:bg-gray-50',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
  const cls = `px-4 py-2 rounded-md font-medium ${variants[variant] || variants.primary} ${className}`;
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

export default Button;
