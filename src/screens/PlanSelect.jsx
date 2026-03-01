import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, X, ChevronDown, Shield, Thermometer, Heart, Check, Pill, BedDouble, Zap } from 'lucide-react';
import PlanCard from '../components/ui/PlanCard';
import Button from '../components/ui/Button';
import { plans } from '../data/plans';
import { coverageSummary } from '../data/copy';
import { formatJapaneseDate, getMinStartDate } from '../hooks/useInsuranceForm';

/* ---- Coverage Carousel ---- */

const coverageSlides = [
  {
    title: '治療保険金',
    amount: '7,000円/回',
    description: 'インフルエンザA型またはB型に罹患し病院等で抗インフルエンザ薬を処方されたとき',
    iconBg: 'bg-smcc-green',
    icon: Pill,
    illustration: 'https://stories.freepiklabs.com/storage/46929/Medical-Prescription_Artboard-1-copy.svg',
  },
  {
    title: '入院保険金',
    amount: '30,000円/回',
    description: 'インフルエンザA型またはB型の治療を目的とする1泊2日以上の入院をしたとき',
    iconBg: 'bg-blue-500',
    icon: BedDouble,
    illustration: 'https://stories.freepiklabs.com/storage/8212/347-Online-doctor_Artboard-1.svg',
  },
];

function CoverageCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="py-6 bg-white">
      <h2 className="text-xl font-black text-gray-800 mb-5 px-5">保障内容</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-5 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .coverage-carousel::-webkit-scrollbar { display: none; }
        `}</style>
        {coverageSlides.map((slide, i) => {
          const Icon = slide.icon;
          return (
            <div
              key={i}
              className="coverage-carousel flex-shrink-0 bg-white rounded-2xl p-6 text-center"
              style={{
                scrollSnapAlign: 'center',
                width: 'calc(100% - 16px)',
                minWidth: 'calc(100% - 16px)',
              }}
            >
              {/* Icon badge */}
              <div className={`w-14 h-14 rounded-full ${slide.iconBg} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={28} className="text-white" strokeWidth={2} />
              </div>

              {/* Title */}
              <p className="text-base font-bold text-gray-800 mb-1">{slide.title}</p>

              {/* Amount */}
              <p className="text-2xl font-black text-gray-900 mb-3">{slide.amount}</p>

              {/* Description */}
              <p className="text-[13px] text-gray-500 leading-relaxed mb-5 px-2">{slide.description}</p>

              {/* Storyset Illustration */}
              <div className="mx-auto" style={{ maxWidth: 200, height: 160 }}>
                <img
                  src={slide.illustration}
                  alt={slide.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-2">
        {coverageSlides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? 'bg-smcc-green' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Main Screen ---- */

export default function PlanSelect({ state, dispatch, onNext }) {
  const minStart = getMinStartDate();

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header - fixed */}
      <div className="shrink-0 bg-white flex items-center justify-between px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <span className="text-base font-bold text-smcc-green">Vpass</span>
        <button type="button" className="p-2 -mr-2">
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

      {/* Hero with illustration */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00A06D 0%, #00875A 50%, #006B47 100%)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-24 -left-10 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 right-8 w-24 h-24 rounded-full bg-white/8" />
        <div className="relative px-5 pt-6 flex gap-2">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded">Vpass会員限定</span>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded">治療保険金最大7,000円</span>
        </div>
        <div className="relative px-5 pt-5 pb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[28px] font-black text-white leading-tight tracking-tight">インフルエンザ<br />お見舞い金</h1>
            <p className="text-base text-white/70 mt-2">インフルエンザにそなえる</p>
          </div>
          <div className="flex-shrink-0 w-36 h-36">
            <img
              src="https://stories.freepiklabs.com/storage/11960/medicine-[Recuperado]_Freepik_copy_copy-(1)_Mesa-de-trabajo-1.svg"
              alt="Medicine"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Info chip */}
      <div className="mx-4 -mt-4 relative z-10 bg-white rounded-xl px-4 py-3.5 flex items-center gap-2.5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
        <Check size={18} className="text-smcc-green flex-shrink-0" strokeWidth={3} />
        <span className="text-sm font-medium text-gray-700">保険料は毎月お支払い、期間中の解約OK</span>
      </div>

        {/* Info banner */}
        <div className="bg-amber-50 px-5 py-3 flex items-center gap-2.5 mt-4">
          <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">!</span>
          </span>
          <span className="text-sm text-gray-600">10日後の日付から設定できます</span>
        </div>

        {/* Date selection */}
        <div className="px-5 pt-6 pb-5">
          <h2 className="text-xl font-black text-gray-800 mb-6">ご希望の条件を選択してください</h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400 mb-2">保険開始日時</p>
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between relative">
                <span className="text-xl font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}</span>
                <ChevronDown size={20} className="text-gray-400" />
                <input
                  type="date"
                  value={state.coverageStart}
                  min={minStart}
                  onChange={(e) => dispatch({ type: 'SET_COVERAGE_START', payload: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <span className="inline-block bg-accent-orange text-white text-xs font-bold px-2.5 py-1 rounded mb-2">4月までの加入がおすすめ</span>
              <p className="text-sm text-gray-400 mb-2">終了日時</p>
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between relative">
                <span className="text-xl font-bold text-gray-800">{formatJapaneseDate(state.coverageEnd)}</span>
                <ChevronDown size={20} className="text-gray-400" />
                <input
                  type="date"
                  value={state.coverageEnd}
                  min={state.coverageStart}
                  onChange={(e) => dispatch({ type: 'SET_COVERAGE_END', payload: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* Plan Cards */}
        <div className="px-5 py-6 space-y-4">
          <h2 className="text-xl font-black text-gray-800 mb-2">プランを選択</h2>
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={state.selectedPlan === plan.id}
              onSelect={(id) => dispatch({ type: 'SELECT_PLAN', payload: id })}
            />
          ))}
        </div>

        {/* Coverage Carousel */}
        <CoverageCarousel />

        {/* Coverage Comparison Table */}
        <div className="px-5 py-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-black text-gray-800">プラン比較</h2>
            <span className="text-sm text-smcc-green font-bold">保険の詳細</span>
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden text-center">
            <div className="grid grid-cols-4 bg-smcc-green-light">
              <div className="py-3.5 px-1 font-bold text-smcc-green-dark text-sm">項目</div>
              <div className="py-3.5 px-1 font-bold text-smcc-green-dark text-sm">お手軽<br />プラン</div>
              <div className="py-3.5 px-1 font-bold text-smcc-green-dark text-sm">基本<br />プラン</div>
              <div className="py-3.5 px-1 font-bold text-smcc-green-dark text-sm">安心<br />プラン</div>
            </div>
            <div className="bg-gray-50 py-2.5 text-sm text-gray-500 font-medium border-t border-gray-200">月額保険料</div>
            <div className="grid grid-cols-4 border-t border-gray-200">
              <div className="py-3 px-1 text-sm font-bold text-gray-700">20〜99歳</div>
              <div className="py-3 px-1 text-sm text-gray-600">250円</div>
              <div className="py-3 px-1 text-sm text-gray-600">350円</div>
              <div className="py-3 px-1 text-sm text-gray-600">480円</div>
            </div>
            <div className="bg-gray-50 py-2.5 text-sm text-gray-500 font-medium border-t border-gray-200">保障内容</div>
            <div className="grid grid-cols-4 border-t border-gray-200">
              <div className="py-3 px-1 text-sm font-bold text-gray-700">治療保険金</div>
              <div className="py-3 px-1 text-sm text-gray-600">3,000円/回</div>
              <div className="py-3 px-1 text-sm text-gray-600">5,000円/回</div>
              <div className="py-3 px-1 text-sm text-gray-600">7,000円/回</div>
            </div>
            <div className="grid grid-cols-4 border-t border-gray-200">
              <div className="py-3 px-1 text-sm font-bold text-gray-700">入院保険金</div>
              <div className="py-3 px-1 text-sm text-gray-600 col-span-3">30,000円/回</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            本内容は概要を説明したものです。詳細は重要事項説明書と約款などを必ずご確認ください。
          </p>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* Merits — bottom */}
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

        {/* Coverage Summary */}
        <div className="px-5 py-6">
          <h2 className="text-lg font-black text-gray-800 mb-4">保障内容まとめ</h2>
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
      {/* end scrollable */}

      {/* Fixed CTA */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button onClick={onNext}>
          加入手続きに進む
        </Button>
      </div>
    </div>
  );
}
