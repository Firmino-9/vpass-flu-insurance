import React, { useEffect, useState } from 'react';
import { Check, Mail, ClipboardList, Smartphone, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { plans } from '../data/plans';
import { completeContent } from '../data/copy';
import { formatJapaneseDate } from '../hooks/useInsuranceForm';

export default function Complete({ state }) {
  const [animateIn, setAnimateIn] = useState(false);
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextStepIcons = [Mail, ClipboardList, Smartphone, AlertCircle];

  const nextSteps = [
    completeContent.nextSteps[0],
    `保障開始日は${formatJapaneseDate(state.coverageStart)}です。`,
    completeContent.nextSteps[2],
    completeContent.nextSteps[3],
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes checkScale {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .check-animate { animation: checkScale 0.6s ease-out forwards; }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; }
        .fade-up-d1 { animation: fadeUp 0.5s ease-out 0.3s forwards; opacity: 0; }
        .fade-up-d2 { animation: fadeUp 0.5s ease-out 0.5s forwards; opacity: 0; }
        .fade-up-d3 { animation: fadeUp 0.5s ease-out 0.7s forwards; opacity: 0; }
      `}</style>

      {/* Hero */}
      <div className="pt-12 pb-8 text-center" style={{ background: 'linear-gradient(180deg, #E8F5EE 0%, #FFFFFF 100%)' }}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-smcc-green mb-4 ${animateIn ? 'check-animate' : 'opacity-0'}`}>
          <Check size={40} strokeWidth={3} className="text-white" />
        </div>
        <h1 className={`text-2xl font-black text-gray-800 mb-3 ${animateIn ? 'fade-up' : 'opacity-0'}`}>
          {completeContent.title}
        </h1>
        <p className={`text-base text-gray-500 px-8 mb-5 ${animateIn ? 'fade-up-d1' : 'opacity-0'}`}>
          {completeContent.subtitle}
        </p>
        {/* Storyset illustration */}
        <div className={`mx-auto ${animateIn ? 'fade-up-d1' : 'opacity-0'}`} style={{ maxWidth: 220, height: 180 }}>
          <img
            src="https://stories.freepiklabs.com/storage/38550/Completed-steps-(1)_Artboard-1.svg"
            alt="Completed"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Contract Summary */}
      <div className={`px-5 py-6 ${animateIn ? 'fade-up-d1' : 'opacity-0'}`}>
        <h3 className="text-lg font-black text-gray-800 mb-4">ご契約内容</h3>
        <div className="divide-y divide-gray-200">
          <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険名</span><span className="text-base font-bold text-gray-800">インフルエンザお見舞い金</span></div>
          <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">プラン</span><span className="text-base font-bold text-gray-800">{selectedPlan?.name}</span></div>
          <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険期間</span><span className="text-base font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}〜{formatJapaneseDate(state.coverageEnd)}</span></div>
          <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">月額保険料</span><span className="text-base font-bold text-gray-800">{selectedPlan?.monthlyPremium.toLocaleString()}円</span></div>
          <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">証券番号</span><span className="text-base font-bold text-gray-800">{completeContent.contractSummary.contractNumber}</span></div>
        </div>
      </div>

      <div className="h-2.5 bg-gray-50" />

      {/* Next Steps */}
      <div className={`px-5 py-6 ${animateIn ? 'fade-up-d2' : 'opacity-0'}`}>
        <h3 className="text-lg font-black text-gray-800 mb-4">次のステップ</h3>
        <div className="space-y-4">
          {nextSteps.map((step, i) => {
            const Icon = nextStepIcons[i];
            return (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-smcc-green-light flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-smcc-green" />
                </div>
                <p className="text-[15px] text-gray-600 pt-2 leading-relaxed">{step}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`px-5 pb-8 space-y-3 ${animateIn ? 'fade-up-d3' : 'opacity-0'}`}>
        <Button variant="primary">家族の分も申し込む</Button>
        <Button variant="outline">Vpassホームに戻る</Button>
      </div>
    </div>
  );
}
