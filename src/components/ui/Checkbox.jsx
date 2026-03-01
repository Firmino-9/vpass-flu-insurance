import React from 'react';
import { Check } from 'lucide-react';

export default function Checkbox({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
            checked ? 'bg-smcc-green' : 'border-2 border-gray-300 bg-white'
          }`}
        >
          {checked && <Check size={14} strokeWidth={3} className="text-white" />}
        </div>
      </div>
      {label && <span className="text-sm text-gray-700 leading-snug">{label}</span>}
    </label>
  );
}
