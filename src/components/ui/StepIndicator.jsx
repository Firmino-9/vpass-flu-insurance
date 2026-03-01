import React from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-between w-full px-2">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center gap-1">
              {/* Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCompleted
                    ? 'bg-smcc-green text-white'
                    : isActive
                      ? 'bg-smcc-green text-white'
                      : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
              </div>
              {/* Label */}
              <span
                className={`text-[10px] leading-tight text-center ${
                  isActive
                    ? 'font-bold text-smcc-green'
                    : isCompleted
                      ? 'font-medium text-smcc-green'
                      : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 mb-5 ${
                  stepNum < currentStep ? 'bg-smcc-green' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
