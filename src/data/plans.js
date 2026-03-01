export const plans = [
  {
    id: 'otegaru',
    name: 'お手軽プラン',
    monthlyPremium: 250,
    treatmentBenefit: 3000,
    hospitalizationBenefit: 30000,
    recommended: false,
  },
  {
    id: 'kihon',
    name: '基本プラン',
    monthlyPremium: 350,
    treatmentBenefit: 5000,
    hospitalizationBenefit: 30000,
    recommended: false,
  },
  {
    id: 'anshin',
    name: '安心プラン',
    monthlyPremium: 480,
    treatmentBenefit: 7000,
    hospitalizationBenefit: 30000,
    recommended: true,
  },
];

export const insurancePeriod = {
  salesStart: '2025年10月1日',
  salesEnd: '2026年3月31日',
  coverageStart: '2025年11月1日',
  coverageEnd: '2026年4月30日',
};

export const defaultPlanId = 'anshin';
