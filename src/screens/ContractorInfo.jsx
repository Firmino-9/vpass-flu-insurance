import React, { useState } from 'react';
import { ArrowLeft, X, FileCheck, UserCheck, ChevronDown, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { userInfoContent, contractorInfoContent } from '../data/copy';
import { formatJapaneseDate } from '../hooks/useInsuranceForm';

export default function ContractorInfo({ state, dispatch, onNext, onPrev }) {
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length > 0 && (digitsOnly.length < 10 || digitsOnly.length > 11)) {
      setPhoneError('電話番号は10〜11桁の数字で入力してください');
    } else {
      setPhoneError('');
    }
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
    name: { type: 'text' },
    nameKana: { type: 'text' },
    birthday: { type: 'date' },
    gender: { type: 'select', options: ['男性', '女性', 'その他'] },
    phone: { type: 'tel' },
    email: { type: 'email' },
    address: { type: 'text' },
  };

  const displayFields = userInfoContent.autoFilledFields;

  const handleNext = () => {
    dispatch({ type: 'CONFIRM_CONTRACTOR' });
    onNext();
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="shrink-0 bg-white flex items-center px-4 h-12 border-b border-gray-100 z-10">
        <button type="button" onClick={onPrev} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <span className="flex-1 text-center text-base font-bold text-gray-800">契約者情報</span>
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
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <FileCheck size={28} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center -ml-4 mt-6">
              <UserCheck size={20} className="text-white/80" />
            </div>
          </div>
          <p className="text-white font-bold text-base">{contractorInfoContent.heroText}</p>
        </div>

        {/* Vpass auto-fill banner */}
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
                      <input
                        type="date"
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                );
              }

              if (config.type === 'select') {
                return (
                  <div key={field.key}>
                    <p className="text-sm text-gray-400 mb-2">{field.label}</p>
                    <div className="border-b border-gray-200 pb-2.5">
                      <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full text-lg text-gray-800 bg-transparent outline-none appearance-none cursor-pointer"
                      >
                        {config.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              }

              return (
                <div key={field.key}>
                  <p className="text-sm text-gray-400 mb-2">
                    {field.key === 'phone' ? '電話番号（ハイフンなし）' : field.label}
                  </p>
                  <div className={`border-b pb-2.5 ${field.key === 'phone' && phoneError ? 'border-red-500' : 'border-gray-200'}`}>
                    <input
                      type={config.type}
                      value={value}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.key === 'phone' ? '09012345678' : ''}
                      className="w-full text-lg text-gray-800 outline-none bg-transparent"
                    />
                  </div>
                  {field.key === 'phone' && phoneError && <p className="mt-1.5 text-sm text-red-500">{phoneError}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="bg-gray-50 px-5 py-5">
          <p className="text-sm text-gray-400 text-center">{contractorInfoContent.footerNote}</p>
        </div>

      </div>
      {/* end scrollable */}

      {/* Fixed dual buttons */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[48px] px-5 rounded-lg font-bold text-sm text-smcc-green border border-smcc-green bg-white active:scale-[0.98] transition-all"
        >
          前へ
        </button>
        <Button onClick={handleNext} disabled={!canProceed} className="flex-1">
          次へ
        </Button>
      </div>
    </div>
  );
}
