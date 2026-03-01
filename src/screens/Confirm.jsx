import React from 'react';
import { ArrowLeft, X, ClipboardList, Megaphone, FileText, ExternalLink, Plus, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import FormField from '../components/ui/FormField';
import Checkbox from '../components/ui/Checkbox';
import { plans } from '../data/plans';
import { userInfoContent, confirmContent } from '../data/copy';
import { agreements, documentLinks } from '../data/legal';
import { formatJapaneseDate } from '../hooks/useInsuranceForm';

export default function Confirm({ state, dispatch, onNext, onPrev, allAgreed }) {
  const selectedPlan = plans.find((p) => p.id === state.selectedPlan);
  const totalMembers = 1 + state.familyMembers.length;

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
          <p className="text-white font-bold text-base">{confirmContent.heroText}</p>
          <p className="text-white/70 text-xs mt-2 px-8 text-center">{confirmContent.subText}</p>
        </div>

        {/* ============================================================
           Section 1: 契約者
           ============================================================ */}
        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-smcc-green">1</span>
              <h2 className="text-xl font-black text-gray-800">契約者</h2>
            </div>
            <button
              type="button"
              onClick={onPrev}
              className="text-sm font-bold text-smcc-green"
            >
              修正
            </button>
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

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* ============================================================
           Section 2: 被保険者
           ============================================================ */}
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

          {/* Family member cards */}
          {state.familyMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-700">ご家族 {index + 1}</span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'REMOVE_FAMILY_MEMBER', payload: index })}
                  className="p-1.5 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <FormField label="お名前" value={member.name} placeholder="例: 三井 花子" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'name', value: e.target.value } })} />
              <FormField label="生年月日" value={member.birthday} placeholder="例: 1990/01/15" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'birthday', value: e.target.value } })} />
              <FormField label="続柄" value={member.relationship} placeholder="例: 配偶者" onChange={(e) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: { index, field: 'relationship', value: e.target.value } })} />
            </div>
          ))}

          {/* 家族追加ボタン */}
          <button
            type="button"
            onClick={() => dispatch({ type: 'ADD_FAMILY_MEMBER' })}
            className="flex items-center gap-2 text-base font-bold text-smcc-green w-full justify-center py-3 border-2 border-smcc-green rounded-xl"
          >
            <Plus size={18} />
            家族を追加
          </button>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* ============================================================
           Section 3: 申込み内容
           ============================================================ */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">申込み内容</h2>
          <div className="divide-y divide-gray-200">
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険</span><span className="text-base font-bold text-gray-800">インフルエンザお見舞い金</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">プラン</span><span className="text-base font-bold text-gray-800">{selectedPlan?.name}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">保険期間</span><span className="text-base font-bold text-gray-800">{formatJapaneseDate(state.coverageStart)}〜{formatJapaneseDate(state.coverageEnd)}</span></div>
            <div className="py-3.5 flex justify-between items-baseline"><span className="text-sm text-gray-400">加入人数</span><span className="text-base font-bold text-gray-800">{totalMembers}名</span></div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* ============================================================
           Section 4: 保険料
           ============================================================ */}
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
              <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
                {userInfoContent.paymentDisplay.cardLabel}（{userInfoContent.paymentDisplay.cardNumber}）でのお支払いとなります。Vポイントも対象です。
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2.5 bg-gray-50" />

        {/* ============================================================
           Section 5: 必要事項の確認
           ============================================================ */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-black text-gray-800 mb-5">必要事項の確認</h2>

          {/* Document Links */}
          <div className="space-y-2.5 mb-6">
            {documentLinks.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                className="flex items-center gap-2.5 py-3.5 px-4 bg-gray-50 rounded-xl text-[15px] text-smcc-green font-bold"
              >
                <FileText size={18} />
                <span className="flex-1">{doc.title}</span>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
            ))}
          </div>

          {/* Agreements */}
          <div className="space-y-5">
            {agreements.map((agreement) => (
              <Checkbox
                key={agreement.id}
                id={agreement.id}
                checked={state.agreements[agreement.id] || false}
                onChange={() => dispatch({ type: 'TOGGLE_AGREEMENT', payload: agreement.id })}
                label={agreement.label}
              />
            ))}
          </div>
        </div>
      </div>
      {/* end scrollable */}

      {/* Fixed footer */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button
          onClick={() => { dispatch({ type: 'COMPLETE' }); onNext(); }}
          disabled={!allAgreed}
        >
          申し込みを確定する
        </Button>
        <p className="text-[11px] text-gray-400 text-center mt-2">
          申込み後のキャンセルは保険開始日前まで可能です
        </p>
      </div>
    </div>
  );
}
