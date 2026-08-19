import React from 'react';

const Select = ({ options = [], className = '', ...props }) => {
  return (
    <select className={`border rounded-md px-3 py-2 ${className}`} {...props}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
};

export default Select;
