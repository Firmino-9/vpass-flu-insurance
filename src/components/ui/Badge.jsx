import React from 'react';

const variantClasses = {
  orange: 'bg-accent-orange text-white',
  green: 'bg-smcc-green-light text-smcc-green',
};

export default function Badge({ children, variant = 'orange' }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${variantClasses[variant] || variantClasses.orange}`}
    >
      {children}
    </span>
  );
}
