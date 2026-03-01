import React from 'react';
import { useInsuranceForm } from './hooks/useInsuranceForm';
import { useStepNavigation } from './hooks/useStepNavigation';
import PlanSelect from './screens/PlanSelect';
import Enrollment from './screens/Enrollment';
import ContractorInfo from './screens/ContractorInfo';
import Confirm from './screens/Confirm';
import Complete from './screens/Complete';

export default function App() {
  const { state, dispatch, allAgreed } = useInsuranceForm();
  const { goNext, goPrev } = useStepNavigation(dispatch, state.currentStep);

  const screens = [
    <PlanSelect key={0} state={state} dispatch={dispatch} onNext={goNext} />,
    <Enrollment key={1} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} />,
    <ContractorInfo key={2} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} />,
    <Confirm key={3} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} allAgreed={allAgreed} />,
    <Complete key={4} state={state} />,
  ];

  return (
    <div className="max-w-[428px] mx-auto bg-white min-h-screen relative overflow-x-hidden">
      <style>{`
        .screen-enter { animation: slideIn 300ms ease-out forwards; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div key={state.currentStep} className="screen-enter">
        {screens[state.currentStep]}
      </div>
    </div>
  );
}
