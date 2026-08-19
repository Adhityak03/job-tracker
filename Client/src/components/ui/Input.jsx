import React from 'react';

const Input = ({ label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <input className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-indigo-300" {...props} />
    </div>
  );
};

export default Input;
