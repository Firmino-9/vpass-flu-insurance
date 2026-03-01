import { useReducer } from 'react';

export function formatJapaneseDate(isoStr) {
  const [year, month, day] = isoStr.split('-');
  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function getDefaultDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() + 10);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 6);
  return {
    coverageStart: start.toISOString().split('T')[0],
    coverageEnd: end.toISOString().split('T')[0],
  };
}

function getMinStartDate() {
  const today = new Date();
  today.setDate(today.getDate() + 10);
  return today.toISOString().split('T')[0];
}

const defaults = getDefaultDates();

const initialState = {
  currentStep: 0,
  selectedPlan: 'anshin',
  coverageStart: defaults.coverageStart,
  coverageEnd: defaults.coverageEnd,
  contractorConfirmed: false,
  familyEnabled: false,
  familyMembers: [],
  userInfo: {
    name: '三井 太郎',
    nameKana: 'ミツイ タロウ',
    birthday: '1985-06-15',
    gender: '男性',
    phone: '09012345678',
    email: 'taro.mitsui@example.com',
    address: '東京都港区海岸1-2-3',
  },
  insuredInfo: {
    name: '',
    nameKana: '',
    birthday: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  },
  agreements: {
    'important-notice': false,
    'contract-overview': false,
    'privacy-policy': false,
  },
  isCompleted: false,
};

function recalcEndDate(startIso) {
  const start = new Date(startIso + 'T00:00:00');
  const end = new Date(start);
  end.setMonth(end.getMonth() + 6);
  return end.toISOString().split('T')[0];
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case 'SELECT_PLAN':
      return { ...state, selectedPlan: action.payload };
    case 'SET_COVERAGE_START': {
      const newStart = action.payload;
      return { ...state, coverageStart: newStart, coverageEnd: recalcEndDate(newStart) };
    }
    case 'SET_COVERAGE_END':
      return { ...state, coverageEnd: action.payload };
    case 'TOGGLE_FAMILY':
      return { ...state, familyEnabled: !state.familyEnabled, familyMembers: !state.familyEnabled ? state.familyMembers : [] };
    case 'ADD_FAMILY_MEMBER':
      return { ...state, familyMembers: [...state.familyMembers, { name: '', birthday: '', relationship: '' }] };
    case 'UPDATE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.map((m, i) =>
          i === action.payload.index ? { ...m, [action.payload.field]: action.payload.value } : m
        ),
      };
    case 'REMOVE_FAMILY_MEMBER':
      return { ...state, familyMembers: state.familyMembers.filter((_, i) => i !== action.payload) };
    case 'UPDATE_USER_INFO':
      return { ...state, userInfo: { ...state.userInfo, [action.payload.field]: action.payload.value } };
    case 'CONFIRM_CONTRACTOR':
      return { ...state, contractorConfirmed: true, insuredInfo: { ...state.userInfo } };
    case 'RESET_CONTRACTOR':
      return { ...state, contractorConfirmed: false, insuredInfo: { name: '', nameKana: '', birthday: '', gender: '', phone: '', email: '', address: '' } };
    case 'UPDATE_INSURED_INFO':
      return { ...state, insuredInfo: { ...state.insuredInfo, [action.payload.field]: action.payload.value } };
    case 'TOGGLE_AGREEMENT':
      return {
        ...state,
        agreements: { ...state.agreements, [action.payload]: !state.agreements[action.payload] },
      };
    case 'COMPLETE':
      return { ...state, isCompleted: true, currentStep: 4 };
    default:
      return state;
  }
}

export { getMinStartDate };

export function useInsuranceForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const allAgreed = Object.values(state.agreements).every(Boolean);

  return { state, dispatch, allAgreed };
}
