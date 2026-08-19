import React from 'react';

const Pagination = ({ page = 1, total = 1, pageSize = 8, onPageChange = () => {} }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onPageChange(Math.max(1, page - 1))} className="p-2 rounded-full border">◀</button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={`w-8 h-8 rounded-full ${p===page ? 'bg-indigo-600 text-white' : 'border text-gray-600'}`}>{p}</button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} className="p-2 rounded-full border">▶</button>
    </div>
  );
};

export default Pagination;
