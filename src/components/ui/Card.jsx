import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-xl p-4 ${className}`}
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
    >
      {children}
    </div>
  );
}
