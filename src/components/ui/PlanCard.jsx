import React from 'react';
import { Check } from 'lucide-react';

export default function PlanCard({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={`relative w-full text-left rounded-xl transition-all duration-150 ease-in-out ${
        selected
          ? 'border-2 border-smcc-green bg-smcc-green-light p-5'
          : 'border border-gray-200 bg-white p-[21px]'
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 right-3 inline-block rounded-full px-3 py-0.5 text-xs font-bold bg-accent-orange text-white">
          売れ筋
        </span>
      )}

      <div className="flex items-start gap-3.5">
        {/* Radio / Check indicator */}
        <div className="mt-1 flex-shrink-0">
          {selected ? (
            <div className="w-6 h-6 rounded-full bg-smcc-green flex items-center justify-center">
              <Check size={14} strokeWidth={3} className="text-white" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-lg font-black text-gray-800">{plan.name}</p>
          <div className="mt-2 space-y-0.5 text-sm text-gray-500">
            <p>治療保険金 <span className="font-bold text-gray-700">{plan.treatmentBenefit.toLocaleString()}円</span>/回</p>
            <p>入院保険金 <span className="font-bold text-gray-700">{plan.hospitalizationBenefit.toLocaleString()}円</span>/回</p>
          </div>
        </div>
      </div>
    </button>
  );
}
