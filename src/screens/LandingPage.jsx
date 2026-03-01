import React from 'react';
import { ArrowLeft, X, CheckCircle, Pill, BedDouble, Zap, Clock, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { recommendedFor, coverageSummary, ctaTexts } from '../data/copy';

export default function LandingPage({ onNext }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 h-12 border-b border-gray-100">
        <button type="button" className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <span className="text-base font-bold text-smcc-green">Vpass</span>
        <button type="button" className="p-2 -mr-2">
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00A06D 0%, #00875A 50%, #006B47 100%)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-24 -left-10 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 right-8 w-24 h-24 rounded-full bg-white/8" />

        {/* Tags */}
        <div className="relative px-5 pt-6 flex gap-2">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded">Vpass会員限定</span>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded">治療保険金最大7,000円</span>
        </div>

        <div className="relative px-5 pt-5 pb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[28px] font-black text-white leading-tight tracking-tight">インフルエンザ<br />お見舞い金</h1>
            <p className="text-base text-white/70 mt-2">インフルエンザにそなえる</p>
          </div>
          {/* Illustration */}
          <img
            src="/medical-care-pana.svg"
            alt="医療イラスト"
            className="w-32 h-32 flex-shrink-0 -mb-2"
          />
        </div>
      </div>

      {/* Info banner */}
      <div className="mx-4 -mt-4 relative z-10 bg-white rounded-xl px-4 py-3.5 flex items-center gap-2.5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
        <Check size={18} className="text-smcc-green flex-shrink-0" strokeWidth={3} />
        <span className="text-sm font-medium text-gray-700">保険料は毎月お支払い、期間中の解約OK</span>
      </div>

      <div className="flex-1 pb-24">
        {/* Merits */}
        <div className="px-5 pt-7 space-y-5">
          {[
            { icon: Pill, title: '治療薬の処方で', amount: '最大7,000円', desc: 'インフルエンザと診断され、抗インフルエンザ薬が処方された場合にお見舞い金をお支払い。', iconBg: 'bg-smcc-green' },
            { icon: BedDouble, title: '入院時', amount: '30,000円お支払い', desc: 'インフルエンザによる1泊2日以上の入院で、入院保険金をお受け取りいただけます。', iconBg: 'bg-blue-500' },
            { icon: Zap, title: '保険金は', amount: '最短即日受取り', desc: 'Vpassアプリから簡単に請求。審査完了後、最短即日でお受け取りいただけます。', iconBg: 'bg-amber-500' },
          ].map((merit, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${merit.iconBg} flex items-center justify-center`}>
                <merit.icon size={24} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-base text-gray-800 leading-snug">
                  {merit.title}<span className="font-black text-lg">{merit.amount}</span>
                </p>
                <p className="text-[13px] text-gray-400 mt-1.5 leading-relaxed">{merit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50 mt-7" />

        {/* Recommended For */}
        <div className="px-5 py-6">
          <h2 className="text-lg font-black text-gray-800 mb-4">こんな方におすすめ</h2>
          <ul className="space-y-3.5">
            {recommendedFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-smcc-green flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* Coverage Summary */}
        <div className="px-5 py-6">
          <h2 className="text-lg font-black text-gray-800 mb-4">保障内容</h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            {coverageSummary.map((item, i) => (
              <div key={i} className={`px-4 py-3.5 ${i % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'} ${i < coverageSummary.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-base font-bold text-gray-800">{item.value}</span>
                </div>
                {item.note && <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button onClick={onNext}>{ctaTexts.landing}</Button>
      </div>
    </div>
  );
}
