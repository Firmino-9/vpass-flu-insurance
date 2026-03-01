import React from 'react';

const variantClasses = {
  primary: 'bg-smcc-green text-white hover:bg-smcc-green-dark',
  secondary: 'bg-white border border-smcc-green text-smcc-green hover:bg-smcc-green-light',
  outline: 'bg-transparent border border-smcc-green text-smcc-green hover:bg-smcc-green-light',
};

export default function Button({ children, variant = 'primary', disabled, onClick, className = '' }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-[48px] w-full rounded-lg font-bold text-base transition-all active:scale-[0.98] ${variantClasses[variant] || variantClasses.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
