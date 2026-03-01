import React from 'react';
import { ArrowLeft, X, ClipboardList, UserPlus, Plus } from 'lucide-react';
import { plans } from '../data/plans';
import { enrollmentContent } from '../data/copy';
import { formatJapaneseDate } from '../hooks/useInsuranceForm';

export default function Enrollment({ state, dispatch, onNext, onPrev }) {
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="shrink-0 bg-white flex items-center px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" onClick={onPrev} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <span className="flex-1 text-center text-base font-bold text-gray-800">加入手続き</span>
        <button type="button" className="p-2 -mr-2">
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* Hero gradient header */}
        <div className="relative overflow-hidden py-8 flex flex-col items-center" style={{ background: 'linear-gradient(135deg, #0ABF82 0%, #00A06D 50%, #00875A 100%)' }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
            <ClipboardList size={28} className="text-white" />
          </div>
          <p className="text-white font-bold text-base">{enrollmentContent.heroText}</p>
        </div>

        {/* Section 1: 契約者 */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-smcc-green">1</span>
            <h2 className="text-xl font-black text-gray-800">{enrollmentContent.contractorSection.title}</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">{enrollmentContent.contractorSection.description}</p>
          <button
            type="button"
            onClick={onNext}
            className="w-full min-h-[48px] rounded-lg font-bold text-sm text-smcc-green border-2 border-smcc-green bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            {enrollmentContent.contractorSection.buttonText}
          </button>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* Section 2: 被保険者 (disabled) */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-gray-300">2</span>
            <h2 className="text-xl font-black text-gray-300">{enrollmentContent.insuredSection.title}</h2>
          </div>
          <p className="text-sm text-gray-400 mb-5">{enrollmentContent.insuredSection.description}</p>
          <button
            type="button"
            disabled
            className="w-full min-h-[48px] rounded-lg font-bold text-sm text-gray-300 border-2 border-gray-200 bg-gray-50 flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <UserPlus size={18} />
            {enrollmentContent.insuredSection.buttonText}
          </button>
          <p className="text-xs text-gray-400 mt-3">{enrollmentContent.insuredSection.note}</p>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* 申込み内容サマリー */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">申込み内容</h2>
          <div className="divide-y divide-gray-200">
            <div className="py-3.5 flex justify-between items-baseline">
              <span className="text-sm text-gray-400">保険</span>
              <span className="text-base font-bold text-gray-800">インフルエンザお見舞い金</span>
            </div>
            <div className="py-3.5 flex justify-between items-baseline">
              <span className="text-sm text-gray-400">プラン</span>
              <span className="text-base font-bold text-gray-800">{selectedPlan?.name}</span>
            </div>
            <div className="py-3.5 flex justify-between items-baseline">
              <span className="text-sm text-gray-400">保険期間</span>
              <span className="text-base font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}〜{formatJapaneseDate(state.coverageEnd)}</span>
            </div>
            <div className="py-3.5 flex justify-between items-baseline">
              <span className="text-sm text-gray-400">月額保険料</span>
              <span className="text-base font-bold text-gray-800">{selectedPlan?.monthlyPremium.toLocaleString()}円/月</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
