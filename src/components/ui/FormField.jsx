import React from 'react';

export default function FormField({ label, value, onChange, error, disabled, type = 'text', placeholder }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border rounded-lg p-3 text-base outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-smcc-green'
        } ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
