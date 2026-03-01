import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import {
  ArrowLeft, X, Check, Pill, BedDouble, Zap, Shield, Thermometer, Heart,
  Plus, Trash2, ChevronDown, FileCheck, UserCheck, UserPlus, ClipboardList, Megaphone, FileText, ExternalLink,
  Mail, Smartphone, AlertCircle
} from 'lucide-react';

/* ============================================================
   DATA
   ============================================================ */

const plans = [
  { id: 'otegaru', name: 'お手軽プラン', monthlyPremium: 250, treatmentBenefit: 3000, hospitalizationBenefit: 30000, recommended: false },
  { id: 'kihon', name: '基本プラン', monthlyPremium: 350, treatmentBenefit: 5000, hospitalizationBenefit: 30000, recommended: false },
  { id: 'anshin', name: '安心プラン', monthlyPremium: 480, treatmentBenefit: 7000, hospitalizationBenefit: 30000, recommended: true },
];

const coverageSummary = [
  { label: '通院治療保険金', value: '3,000円〜7,000円', note: 'インフルエンザと診断され通院治療を受けた場合' },
  { label: '入院保険金', value: '一律 30,000円', note: 'インフルエンザにより1日以上入院した場合' },
  { label: '保険期間', value: '2025年11月〜2026年4月', note: 'インフルエンザ流行シーズンをカバー' },
];

const coverageSlides = [
  {
    title: '治療保険金',
    amount: '7,000円/回',
    description: 'インフルエンザA型またはB型に罹患し病院等で抗インフルエンザ薬を処方されたとき',
    iconBg: 'bg-smcc-green',
    iconComponent: 'Pill',
    illustration: 'https://stories.freepiklabs.com/storage/46929/Medical-Prescription_Artboard-1-copy.svg',
  },
  {
    title: '入院保険金',
    amount: '30,000円/回',
    description: 'インフルエンザA型またはB型の治療を目的とする1泊2日以上の入院をしたとき',
    iconBg: 'bg-blue-500',
    iconComponent: 'BedDouble',
    illustration: 'https://stories.freepiklabs.com/storage/8212/347-Online-doctor_Artboard-1.svg',
  },
];

const userInfoContent = {
  autoFilledFields: [
    { label: '氏名', key: 'name' },
    { label: 'フリガナ', key: 'nameKana' },
    { label: '生年月日', key: 'birthday' },
    { label: '性別', key: 'gender' },
    { label: '電話番号', key: 'phone' },
    { label: 'メールアドレス', key: 'email' },
    { label: '住所', key: 'address' },
  ],
  paymentDisplay: {
    title: 'お支払い方法',
    cardLabel: '三井住友カード（Visa）',
    cardNumber: '**** **** **** 1234',
    note: '毎月のカードご利用代金と合わせてお支払い。Vポイントも対象です。',
  },
};

const enrollmentContent = {
  heroText: '1〜2の項目を入力してください',
  contractorSection: {
    title: '契約者',
    description: '契約者の情報を入力してください。',
    buttonText: '＋契約者入力',
  },
  insuredSection: {
    title: '被保険者',
    description: '契約者の入力後に設定できます。',
    buttonText: '＋家族を追加',
    note: '※被保険者は契約者の入力完了後に設定できます。',
  },
};

const contractorInfoContent = {
  heroText: 'お客様情報を確認してください',
  vpassBanner: 'Vpass会員情報で自動入力済み',
  footerNote: '契約者はVpassアプリ利用者本人のみとなります',
};

const confirmContent = {
  heroText: '申込み内容の確認',
  subText: '以下の内容でお申し込みを受け付けます。内容をご確認の上、「申し込みを確定する」ボタンを押してください。',
};

const completeContent = {
  title: 'お申し込みが完了しました',
  subtitle: 'インフルエンザお見舞い金保険にお申し込みいただきありがとうございます。',
  nextSteps: [
    '確認メールをご登録のアドレスに送信しました。',
    '',
    '契約内容はVpassアプリからいつでもご確認いただけます。',
    '保険金のご請求もVpassアプリから簡単に行えます。',
  ],
  contractSummary: { contractNumber: 'FLU-2025-0001234' },
};

const agreements = [
  { id: 'important-notice', label: '重要事項説明書の内容を確認し、同意します。' },
  { id: 'contract-overview', label: '契約概要・注意喚起情報の内容を確認し、同意します。' },
  { id: 'privacy-policy', label: '個人情報の取扱いに関する事項を確認し、同意します。' },
];

const documentLinks = [
  { id: 'important-notice-doc', title: '重要事項説明書', url: '#important-notice' },
  { id: 'contract-overview-doc', title: '契約概要・注意喚起情報', url: '#contract-overview' },
  { id: 'privacy-policy-doc', title: '個人情報の取扱いについて', url: '#privacy-policy' },
];

/* ============================================================
   HELPERS
   ============================================================ */

function formatJapaneseDate(isoStr) {
  const [year, month, day] = isoStr.split('-');
  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function getDefaultDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() + 10);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 6);
  return { coverageStart: start.toISOString().split('T')[0], coverageEnd: end.toISOString().split('T')[0] };
}

function getMinStartDate() {
  const today = new Date();
  today.setDate(today.getDate() + 10);
  return today.toISOString().split('T')[0];
}

function recalcEndDate(startIso) {
  const start = new Date(startIso + 'T00:00:00');
  const end = new Date(start);
  end.setMonth(end.getMonth() + 6);
  return end.toISOString().split('T')[0];
}

/* ============================================================
   HOOKS
   ============================================================ */

const defaults = getDefaultDates();

const initialState = {
  currentStep: 0,
  selectedPlan: 'anshin',
  coverageStart: defaults.coverageStart,
  coverageEnd: defaults.coverageEnd,
  contractorConfirmed: false,
  familyEnabled: false,
  familyMembers: [],
  userInfo: { name: '三井 太郎', nameKana: 'ミツイ タロウ', birthday: '1985-06-15', gender: '男性', phone: '09012345678', email: 'taro.mitsui@example.com', address: '東京都港区海岸1-2-3' },
  insuredInfo: { name: '', nameKana: '', birthday: '', gender: '', phone: '', email: '', address: '' },
  agreements: { 'important-notice': false, 'contract-overview': false, 'privacy-policy': false },
  isCompleted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP': return { ...state, currentStep: action.payload };
    case 'NEXT_STEP': return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP': return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case 'SELECT_PLAN': return { ...state, selectedPlan: action.payload };
    case 'SET_COVERAGE_START': { const s = action.payload; return { ...state, coverageStart: s, coverageEnd: recalcEndDate(s) }; }
    case 'SET_COVERAGE_END': return { ...state, coverageEnd: action.payload };
    case 'TOGGLE_FAMILY': return { ...state, familyEnabled: !state.familyEnabled, familyMembers: !state.familyEnabled ? state.familyMembers : [] };
    case 'ADD_FAMILY_MEMBER': return { ...state, familyMembers: [...state.familyMembers, { name: '', birthday: '', relationship: '' }] };
    case 'UPDATE_FAMILY_MEMBER': return { ...state, familyMembers: state.familyMembers.map((m, i) => i === action.payload.index ? { ...m, [action.payload.field]: action.payload.value } : m) };
    case 'REMOVE_FAMILY_MEMBER': return { ...state, familyMembers: state.familyMembers.filter((_, i) => i !== action.payload) };
    case 'UPDATE_USER_INFO': return { ...state, userInfo: { ...state.userInfo, [action.payload.field]: action.payload.value } };
    case 'CONFIRM_CONTRACTOR': return { ...state, contractorConfirmed: true, insuredInfo: { ...state.userInfo } };
    case 'RESET_CONTRACTOR': return { ...state, contractorConfirmed: false, insuredInfo: { name: '', nameKana: '', birthday: '', gender: '', phone: '', email: '', address: '' } };
    case 'UPDATE_INSURED_INFO': return { ...state, insuredInfo: { ...state.insuredInfo, [action.payload.field]: action.payload.value } };
    case 'TOGGLE_AGREEMENT': return { ...state, agreements: { ...state.agreements, [action.payload]: !state.agreements[action.payload] } };
    case 'COMPLETE': return { ...state, isCompleted: true, currentStep: 4 };
    default: return state;
  }
}

function useInsuranceForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const allAgreed = Object.values(state.agreements).every(Boolean);
  return { state, dispatch, allAgreed };
}

function useStepNavigation(dispatch) {
  const goNext = useCallback(() => { dispatch({ type: 'NEXT_STEP' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [dispatch]);
  const goPrev = useCallback(() => { dispatch({ type: 'PREV_STEP' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [dispatch]);
  return { goNext, goPrev };
}

/* ============================================================
   UI COMPONENTS
   ============================================================ */

const buttonVariantClasses = {
  primary: 'bg-smcc-green text-white hover:bg-smcc-green-dark',
  secondary: 'bg-white border border-smcc-green text-smcc-green hover:bg-smcc-green-light',
  outline: 'bg-transparent border border-smcc-green text-smcc-green hover:bg-smcc-green-light',
};

function Button({ children, variant = 'primary', disabled, onClick, className = '' }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className={`min-h-[48px] w-full rounded-lg font-bold text-base transition-all active:scale-[0.98] ${buttonVariantClasses[variant] || buttonVariantClasses.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  );
}

const badgeVariantClasses = {
  orange: 'bg-accent-orange text-white',
  green: 'bg-smcc-green-light text-smcc-green',
};

function Badge({ children, variant = 'orange' }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeVariantClasses[variant] || badgeVariantClasses.orange}`}>
      {children}
    </span>
  );
}

function PlanCard({ plan, selected, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(plan.id)}
      className={`relative w-full text-left rounded-xl transition-all duration-150 ease-in-out ${selected ? 'border-2 border-smcc-green bg-smcc-green-light p-5' : 'border border-gray-200 bg-white p-[21px]'}`}>
      {plan.recommended && (
        <span className="absolute -top-3 right-3 inline-block rounded-full px-3 py-0.5 text-xs font-bold bg-accent-orange text-white">売れ筋</span>
      )}
      <div className="flex items-start gap-3.5">
        <div className="mt-1 flex-shrink-0">
          {selected ? (
            <div className="w-6 h-6 rounded-full bg-smcc-green flex items-center justify-center"><Check size={14} strokeWidth={3} className="text-white" /></div>
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

function FormField({ label, value, onChange, error, disabled, type = 'text', placeholder }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder}
        className={`w-full border rounded-lg p-3 text-base outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-smcc-green'} ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Checkbox({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-smcc-green' : 'border-2 border-gray-300 bg-white'}`}>
          {checked && <Check size={14} strokeWidth={3} className="text-white" />}
        </div>
      </div>
      {label && <span className="text-sm text-gray-700 leading-snug">{label}</span>}
    </label>
  );
}

/* ---- Coverage Carousel ---- */

const slideIcons = { Pill, BedDouble };

function CoverageCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
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
      <div ref={scrollRef} className="flex overflow-x-auto gap-4 px-5 pb-4"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.cov-scroll::-webkit-scrollbar{display:none}`}</style>
        {coverageSlides.map((slide, i) => {
          const Icon = slideIcons[slide.iconComponent];
          return (
            <div key={i} className="cov-scroll flex-shrink-0 bg-white rounded-2xl p-6 text-center"
              style={{ scrollSnapAlign: 'center', width: 'calc(100% - 16px)', minWidth: 'calc(100% - 16px)' }}>
              <div className={`w-14 h-14 rounded-full ${slide.iconBg} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={28} className="text-white" strokeWidth={2} />
              </div>
              <p className="text-base font-bold text-gray-800 mb-1">{slide.title}</p>
              <p className="text-2xl font-black text-gray-900 mb-3">{slide.amount}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-5 px-2">{slide.description}</p>
              <div className="mx-auto" style={{ maxWidth: 200, height: 160 }}>
                <img src={slide.illustration} alt={slide.title} className="w-full h-full object-contain" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {coverageSlides.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-smcc-green' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SCREENS
   ============================================================ */

function PlanSelectScreen({ state, dispatch, onNext }) {
  const minStart = getMinStartDate();

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="shrink-0 bg-white flex items-center justify-between px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" className="p-2 -ml-2"><ArrowLeft size={20} className="text-gray-600" /></button>
        <span className="text-base font-bold text-smcc-green">Vpass</span>
        <button type="button" className="p-2 -mr-2"><X size={20} className="text-gray-600" /></button>
      </div>

      <div className="flex-1 overflow-y-auto">
      {/* Hero with illustration */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00875A 0%, #006B47 50%, #004D35 100%)' }}>
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
          <div className="flex-shrink-0 w-32 h-32 mr-1">
            <img src="https://stories.freepiklabs.com/storage/11960/medicine-[Recuperado]_Freepik_copy_copy-(1)_Mesa-de-trabajo-1.svg" alt="Medicine" className="w-full h-full object-contain drop-shadow-lg" />
          </div>
        </div>
      </div>

      <div className="mx-4 -mt-4 relative z-10 bg-white rounded-xl px-4 py-3.5 flex items-center gap-2.5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
        <Check size={18} className="text-smcc-green flex-shrink-0" strokeWidth={3} />
        <span className="text-sm font-medium text-gray-700">保険料は毎月お支払い、期間中の解約OK</span>
      </div>

        <div className="bg-amber-50 px-5 py-3 flex items-center gap-2.5 mt-4">
          <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0"><span className="text-white text-xs font-bold">!</span></span>
          <span className="text-sm text-gray-600">10日後の日付から設定できます</span>
        </div>

        <div className="px-5 pt-6 pb-5">
          <h2 className="text-xl font-black text-gray-800 mb-6">ご希望の条件を選択してください</h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400 mb-2">保険開始日時</p>
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between relative">
                <span className="text-xl font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}</span>
                <ChevronDown size={20} className="text-gray-400" />
                <input type="date" value={state.coverageStart} min={minStart} onChange={(e) => dispatch({ type: 'SET_COVERAGE_START', payload: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
            <div>
              <span className="inline-block bg-accent-orange text-white text-xs font-bold px-2.5 py-1 rounded mb-2">4月までの加入がおすすめ</span>
              <p className="text-sm text-gray-400 mb-2">終了日時</p>
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between relative">
                <span className="text-xl font-bold text-gray-800">{formatJapaneseDate(state.coverageEnd)}</span>
                <ChevronDown size={20} className="text-gray-400" />
                <input type="date" value={state.coverageEnd} min={state.coverageStart} onChange={(e) => dispatch({ type: 'SET_COVERAGE_END', payload: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-2.5 bg-gray-50" />

        <div className="px-5 py-6 space-y-4">
          <h2 className="text-xl font-black text-gray-800 mb-2">プランを選択</h2>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} selected={state.selectedPlan === plan.id} onSelect={(id) => dispatch({ type: 'SELECT_PLAN', payload: id })} />
          ))}
        </div>

        {/* Coverage Carousel */}
        <CoverageCarousel />

        {/* Plan Comparison Table */}
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
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">本内容は概要を説明したものです。詳細は重要事項説明書と約款などを必ずご確認ください。</p>
        </div>

        <div className="h-2.5 bg-gray-50" />

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
                <p className="text-base text-gray-800 leading-snug">{merit.title}<span className="font-black text-lg">{merit.amount}</span></p>
                <p className="text-[13px] text-gray-400 mt-1.5 leading-relaxed">{merit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-2.5 bg-gray-50 mt-7" />

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

      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button onClick={onNext}>加入手続きに進む</Button>
      </div>
    </div>
  );
}

/* ---- Step 1: Enrollment ---- */

function EnrollmentScreen({ state, dispatch, onNext, onPrev }) {
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="shrink-0 bg-white flex items-center px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" onClick={onPrev} className="p-2 -ml-2"><ArrowLeft size={20} className="text-gray-600" /></button>
        <span className="flex-1 text-center text-base font-bold text-gray-800">加入手続き</span>
        <button type="button" className="p-2 -mr-2"><X size={20} className="text-gray-600" /></button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="relative overflow-hidden py-8 flex flex-col items-center" style={{ background: 'linear-gradient(135deg, #00A06D 0%, #00875A 50%, #006B47 100%)' }}>
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
          <button type="button" onClick={onNext}
            className="w-full min-h-[48px] rounded-lg font-bold text-sm text-smcc-green border-2 border-smcc-green bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Plus size={18} />{enrollmentContent.contractorSection.buttonText}
          </button>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* Section 2: 被保険者 (disabled) */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-gray-300">2</span>
            <h2 className="text-xl font-black text-gray-300">{enrollmentContent.insuredSection.title}</h2>
          </div>
          <p className="text-sm text-gray-400 mb-5">{enrollmentContent.insuredSection.description}</p>
          <button type="button" disabled
            className="w-full min-h-[48px] rounded-lg font-bold text-sm text-gray-300 border-2 border-gray-200 bg-gray-50 flex items-center justify-center gap-2 cursor-not-allowed">
            <UserPlus size={18} />{enrollmentContent.insuredSection.buttonText}
          </button>
          <p className="text-xs text-gray-400 mt-3">{enrollmentContent.insuredSection.note}</p>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* 申込み内容 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">申込み内容</h2>
          <div className="divide-y divide-gray-200">
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険</span><span className="text-base font-bold text-gray-800">インフルエンザお見舞い金</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">プラン</span><span className="text-base font-bold text-gray-800">{selectedPlan?.name}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険期間</span><span className="text-base font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}〜{formatJapaneseDate(state.coverageEnd)}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">月額保険料</span><span className="text-base font-bold text-gray-800">{selectedPlan?.monthlyPremium.toLocaleString()}円/月</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Step 2: ContractorInfo ---- */

function ContractorInfoScreen({ state, dispatch, onNext, onPrev }) {
  const [phoneError, setPhoneError] = useState('');
  const validatePhone = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length > 0 && (digitsOnly.length < 10 || digitsOnly.length > 11)) setPhoneError('電話番号は10〜11桁の数字で入力してください');
    else setPhoneError('');
  };
  const handleFieldChange = (key, value) => {
    if (key === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      dispatch({ type: 'UPDATE_USER_INFO', payload: { field: 'phone', value: cleaned } });
      validatePhone(cleaned);
    } else {
      dispatch({ type: 'UPDATE_USER_INFO', payload: { field: key, value } });
    }
  };
  const canProceed = state.userInfo.phone.length >= 10 && !phoneError;

  const fieldConfig = {
    name: { type: 'text' }, nameKana: { type: 'text' }, birthday: { type: 'date' },
    gender: { type: 'select', options: ['男性', '女性', 'その他'] },
    phone: { type: 'tel' }, email: { type: 'email' }, address: { type: 'text' },
  };

  const displayFields = userInfoContent.autoFilledFields;

  const handleNext = () => {
    dispatch({ type: 'CONFIRM_CONTRACTOR' });
    onNext();
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="shrink-0 bg-white flex items-center px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" onClick={onPrev} className="p-2 -ml-2"><ArrowLeft size={20} className="text-gray-600" /></button>
        <span className="flex-1 text-center text-base font-bold text-gray-800">契約者情報</span>
        <button type="button" className="p-2 -mr-2"><X size={20} className="text-gray-600" /></button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="relative overflow-hidden py-8 flex flex-col items-center" style={{ background: 'linear-gradient(135deg, #00A06D 0%, #00875A 50%, #006B47 100%)' }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center"><FileCheck size={28} className="text-white" /></div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center -ml-4 mt-6"><UserCheck size={20} className="text-white/80" /></div>
          </div>
          <p className="text-white font-bold text-base">{contractorInfoContent.heroText}</p>
        </div>

        {/* Vpass banner */}
        <div className="px-5 pt-6">
          <div className="bg-smcc-green-light rounded-xl p-3.5 mb-5 flex items-center gap-2.5">
            <Check size={18} className="text-smcc-green flex-shrink-0" strokeWidth={3} />
            <span className="text-sm font-medium text-gray-700">{contractorInfoContent.vpassBanner}</span>
          </div>
        </div>

        {/* Editable fields */}
        <div className="px-5 pb-6">
          <div className="space-y-6">
            {displayFields.map((field) => {
              const config = fieldConfig[field.key];
              const value = state.userInfo[field.key];
              if (config.type === 'date') {
                return (
                  <div key={field.key}>
                    <p className="text-sm text-gray-400 mb-2">{field.label}</p>
                    <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between relative">
                      <span className="text-lg text-gray-800">{formatJapaneseDate(value)}</span>
                      <ChevronDown size={18} className="text-gray-400" />
                      <input type="date" value={value} onChange={(e) => handleFieldChange(field.key, e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                );
              }
              if (config.type === 'select') {
                return (
                  <div key={field.key}>
                    <p className="text-sm text-gray-400 mb-2">{field.label}</p>
                    <div className="border-b border-gray-200 pb-2.5">
                      <select value={value} onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full text-lg text-gray-800 bg-transparent outline-none appearance-none cursor-pointer">
                        {config.options.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    </div>
                  </div>
                );
              }
              return (
                <div key={field.key}>
                  <p className="text-sm text-gray-400 mb-2">{field.key === 'phone' ? '電話番号（ハイフンなし）' : field.label}</p>
                  <div className={`border-b pb-2.5 ${field.key === 'phone' && phoneError ? 'border-red-500' : 'border-gray-200'}`}>
                    <input type={config.type} value={value} onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.key === 'phone' ? '09012345678' : ''} className="w-full text-lg text-gray-800 outline-none bg-transparent" />
                  </div>
                  {field.key === 'phone' && phoneError && <p className="mt-1.5 text-sm text-red-500">{phoneError}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="bg-gray-50 px-5 py-5"><p className="text-sm text-gray-400 text-center">{contractorInfoContent.footerNote}</p></div>
      </div>
      {/* end scrollable */}

      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3">
        <button type="button" onClick={onPrev} className="min-h-[48px] px-5 rounded-lg font-bold text-sm text-smcc-green border border-smcc-green bg-white active:scale-[0.98] transition-all">前へ</button>
        <Button onClick={handleNext} disabled={!canProceed} className="flex-1">次へ</Button>
      </div>
    </div>
  );
}

/* ---- Step 3: Confirm ---- */

function ConfirmScreen({ state, dispatch, onNext, onPrev, allAgreed }) {
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);
  const totalMembers = 1 + state.familyMembers.length;

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="shrink-0 bg-white flex items-center px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" onClick={onPrev} className="p-2 -ml-2"><ArrowLeft size={20} className="text-gray-600" /></button>
        <span className="flex-1 text-center text-base font-bold text-gray-800">加入手続き</span>
        <button type="button" className="p-2 -mr-2"><X size={20} className="text-gray-600" /></button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="relative overflow-hidden py-8 flex flex-col items-center" style={{ background: 'linear-gradient(135deg, #00A06D 0%, #00875A 50%, #006B47 100%)' }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3"><ClipboardList size={28} className="text-white" /></div>
          <p className="text-white font-bold text-base">{confirmContent.heroText}</p>
          <p className="text-white/70 text-xs mt-2 px-8 text-center">{confirmContent.subText}</p>
        </div>

        {/* 1. 契約者 */}
        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-smcc-green">1</span>
              <h2 className="text-xl font-black text-gray-800">契約者</h2>
            </div>
            <button type="button" onClick={onPrev} className="text-sm font-bold text-smcc-green">修正</button>
          </div>
          <p className="text-lg font-bold text-gray-800 mb-3">{state.userInfo.name}</p>
          <div className="space-y-1.5">
            <p className="text-sm text-gray-400">{state.userInfo.nameKana}</p>
            <p className="text-sm text-gray-400">{formatJapaneseDate(state.userInfo.birthday)}</p>
            <p className="text-sm text-gray-400">{state.userInfo.address}</p>
            <p className="text-sm text-gray-400">{state.userInfo.email}</p>
            <p className="text-sm text-gray-400">{state.userInfo.phone}</p>
          </div>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* 2. 被保険者 */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-bold text-smcc-green">2</span>
            <h2 className="text-xl font-black text-gray-800">被保険者</h2>
          </div>

          {/* 本人 card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-800">{state.insuredInfo.name}</span>
              <Badge variant="green">本人</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{state.insuredInfo.nameKana}</p>
              <p className="text-sm text-gray-400">{formatJapaneseDate(state.insuredInfo.birthday)}</p>
            </div>
          </div>

          {/* Family cards */}
          {state.familyMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-700">ご家族 {index + 1}</span>
                <button type="button" onClick={() => dispatch({ type: 'REMOVE_FAMILY_MEMBER', payload: index })} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
              <FormField label="お名前" value={member.name} placeholder="例: 三井 花子" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'name', value: e.target.value } })} />
              <FormField label="生年月日" value={member.birthday} placeholder="例: 1990/01/15" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'birthday', value: e.target.value } })} />
              <FormField label="続柄" value={member.relationship} placeholder="例: 配偶者" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'relationship', value: e.target.value } })} />
            </div>
          ))}

          <button type="button" onClick={() => dispatch({ type: 'ADD_FAMILY_MEMBER' })}
            className="flex items-center gap-2 text-base font-bold text-smcc-green w-full justify-center py-3 border-2 border-smcc-green rounded-xl">
            <Plus size={18} />家族を追加
          </button>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* 申込み内容 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">申込み内容</h2>
          <div className="divide-y divide-gray-200">
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険</span><span className="text-base font-bold text-gray-800">インフルエンザお見舞い金</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">プラン</span><span className="text-base font-bold text-gray-800">{selectedPlan?.name}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険期間</span><span className="text-base font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}〜{formatJapaneseDate(state.coverageEnd)}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">加入人数</span><span className="text-base font-bold text-gray-800">{totalMembers}名</span></div>
          </div>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* 保険料 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">保険料</h2>
          <div className="divide-y divide-gray-200">
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">1人あたり保険料</span><span className="text-base font-bold text-gray-800">{selectedPlan?.monthlyPremium.toLocaleString()}円/月</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">合計保険料</span><span className="text-lg font-black text-gray-800">{(totalMembers * (selectedPlan?.monthlyPremium || 0)).toLocaleString()}円/月</span></div>
          </div>
        </div>

        {/* Payment info card */}
        <div className="mx-5 mb-5 bg-smcc-green-light rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Megaphone size={20} className="text-smcc-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-800">クレジットカードでのお支払い</p>
              <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{userInfoContent.paymentDisplay.cardLabel}（{userInfoContent.paymentDisplay.cardNumber}）でのお支払いとなります。Vポイントも対象です。</p>
            </div>
          </div>
        </div>

        <div className="h-2.5 bg-gray-50" />

        {/* 必要事項の確認 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">必要事項の確認</h2>
          <div className="space-y-2.5 mb-6">
            {documentLinks.map((doc) => (
              <a key={doc.id} href={doc.url} className="flex items-center gap-2.5 py-3.5 px-4 bg-gray-50 rounded-xl text-[15px] text-smcc-green font-bold">
                <FileText size={18} /><span className="flex-1">{doc.title}</span><ExternalLink size={16} className="text-gray-400" />
              </a>
            ))}
          </div>
          <div className="space-y-5">
            {agreements.map((agreement) => (
              <Checkbox key={agreement.id} id={agreement.id} checked={state.agreements[agreement.id] || false} onChange={() => dispatch({ type: 'TOGGLE_AGREEMENT', payload: agreement.id })} label={agreement.label} />
            ))}
          </div>
        </div>
      </div>
      {/* end scrollable */}

      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button onClick={() => { dispatch({ type: 'COMPLETE' }); onNext(); }} disabled={!allAgreed}>申し込みを確定する</Button>
        <p className="text-[11px] text-gray-400 text-center mt-2">申込み後のキャンセルは保険開始日前まで可能です</p>
      </div>
    </div>
  );
}

/* ---- Step 4: Complete ---- */

function CompleteScreen({ state }) {
  const [animateIn, setAnimateIn] = useState(false);
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);
  useEffect(() => { const timer = setTimeout(() => setAnimateIn(true), 100); return () => clearTimeout(timer); }, []);
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
        @keyframes checkScale { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeUp { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .check-animate { animation: checkScale 0.6s ease-out forwards; }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; }
        .fade-up-d1 { animation: fadeUp 0.5s ease-out 0.3s forwards; opacity: 0; }
        .fade-up-d2 { animation: fadeUp 0.5s ease-out 0.5s forwards; opacity: 0; }
        .fade-up-d3 { animation: fadeUp 0.5s ease-out 0.7s forwards; opacity: 0; }
      `}</style>

      <div className="pt-12 pb-8 text-center" style={{ background: 'linear-gradient(180deg, #E8F5EE 0%, #FFFFFF 100%)' }}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-smcc-green mb-4 ${animateIn ? 'check-animate' : 'opacity-0'}`}>
          <Check size={40} strokeWidth={3} className="text-white" />
        </div>
        <h1 className={`text-2xl font-black text-gray-800 mb-3 ${animateIn ? 'fade-up' : 'opacity-0'}`}>{completeContent.title}</h1>
        <p className={`text-base text-gray-500 px-8 mb-5 ${animateIn ? 'fade-up-d1' : 'opacity-0'}`}>{completeContent.subtitle}</p>
        <div className={`mx-auto ${animateIn ? 'fade-up-d1' : 'opacity-0'}`} style={{ maxWidth: 220, height: 180 }}>
          <img src="https://stories.freepiklabs.com/storage/38550/Completed-steps-(1)_Artboard-1.svg" alt="Completed" className="w-full h-full object-contain" />
        </div>
      </div>

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

      <div className={`px-5 py-6 ${animateIn ? 'fade-up-d2' : 'opacity-0'}`}>
        <h3 className="text-lg font-black text-gray-800 mb-4">次のステップ</h3>
        <div className="space-y-4">
          {nextSteps.map((step, i) => {
            const Icon = nextStepIcons[i];
            return (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-smcc-green-light flex items-center justify-center flex-shrink-0"><Icon size={20} className="text-smcc-green" /></div>
                <p className="text-[15px] text-gray-600 pt-2 leading-relaxed">{step}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`px-5 pb-8 space-y-3 ${animateIn ? 'fade-up-d3' : 'opacity-0'}`}>
        <Button variant="primary">家族の分も申し込む</Button>
        <Button variant="outline">Vpassホームに戻る</Button>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const { state, dispatch, allAgreed } = useInsuranceForm();
  const { goNext, goPrev } = useStepNavigation(dispatch);

  const screens = [
    <PlanSelectScreen key={0} state={state} dispatch={dispatch} onNext={goNext} />,
    <EnrollmentScreen key={1} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} />,
    <ContractorInfoScreen key={2} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} />,
    <ConfirmScreen key={3} state={state} dispatch={dispatch} onNext={goNext} onPrev={goPrev} allAgreed={allAgreed} />,
    <CompleteScreen key={4} state={state} />,
  ];

  return (
    <div className="max-w-[428px] mx-auto bg-white min-h-screen relative overflow-x-hidden">
      <style>{`
        .screen-enter { animation: slideIn 300ms ease-out forwards; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
      <div key={state.currentStep} className="screen-enter">{screens[state.currentStep]}</div>
    </div>
  );
}
