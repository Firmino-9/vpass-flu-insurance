export const heroContent = {
  title: 'インフルエンザお見舞い金',
  subtitle: '月々250円から、インフルエンザの治療・入院に備える',
  emoji: '🤒',
};

export const merits = [
  {
    emoji: '💊',
    title: '治療薬の処方で最大7,000円',
    description:
      'インフルエンザと診断され、抗インフルエンザ薬が処方された場合にお見舞い金をお支払い。',
  },
  {
    emoji: '🏥',
    title: '入院時30,000円お支払い',
    description:
      'インフルエンザによる1泊2日以上の入院で、入院保険金30,000円をお受け取りいただけます。',
  },
  {
    emoji: '⚡',
    title: '保険金は最短即日受取り',
    description:
      'Vpassアプリから簡単に請求。審査完了後、最短即日でお受け取りいただけます。',
  },
];

export const coverageSummary = [
  {
    label: '通院治療保険金',
    value: '3,000円〜7,000円',
    note: 'インフルエンザと診断され通院治療を受けた場合',
  },
  {
    label: '入院保険金',
    value: '一律 30,000円',
    note: 'インフルエンザにより1日以上入院した場合',
  },
  {
    label: '保険期間',
    value: '2025年11月〜2026年4月',
    note: 'インフルエンザ流行シーズンをカバー',
  },
];

export const ctaTexts = {
  landing: '保険料を見る',
  planSelect: 'このプランで申し込む',
  userInfo: '確認画面へ進む',
  confirm: '申し込みを確定する',
};

export const stepLabels = ['プラン選択', '加入手続き', '契約者情報', '確認', '完了'];

export const userInfoContent = {
  vpassBanner: {
    title: 'Vpass会員情報で自動入力済み',
    description:
      'ご登録のお客様情報を反映しています。内容をご確認ください。',
  },
  autoFilledFields: [
    { label: '氏名', value: '三井 太郎', key: 'name' },
    { label: 'フリガナ', value: 'ミツイ タロウ', key: 'nameKana' },
    { label: '生年月日', value: '1985年6月15日', key: 'birthday' },
    { label: '性別', value: '男性', key: 'gender' },
    { label: '電話番号', value: '090-1234-5678', key: 'phone' },
    { label: 'メールアドレス', value: 'taro.mitsui@example.com', key: 'email' },
    { label: '住所', value: '東京都港区海岸1-2-3', key: 'address' },
  ],
  paymentDisplay: {
    title: 'お支払い方法',
    method: 'Vpassに登録のクレジットカード',
    cardLabel: '三井住友カード（Visa）',
    cardNumber: '**** **** **** 1234',
    note: '毎月のカードご利用代金と合わせてお支払い。Vポイントも対象です。',
  },
};

export const enrollmentContent = {
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

export const contractorInfoContent = {
  heroText: 'お客様情報を確認してください',
  vpassBanner: 'Vpass会員情報で自動入力済み',
  footerNote: '契約者はVpassアプリ利用者本人のみとなります',
};

export const confirmContent = {
  heroText: '申込み内容の確認',
  subText: '以下の内容でお申し込みを受け付けます。内容をご確認の上、「申し込みを確定する」ボタンを押してください。',
};

export const completeContent = {
  title: 'お申し込みが完了しました',
  subtitle:
    'インフルエンザお見舞い金保険にお申し込みいただきありがとうございます。',
  nextSteps: [
    '確認メールをご登録のアドレスに送信しました。',
    '保障開始日は2025年11月1日です。',
    '契約内容はVpassアプリからいつでもご確認いただけます。',
    '保険金のご請求もVpassアプリから簡単に行えます。',
  ],
  contractSummary: {
    contractNumber: 'FLU-2025-0001234',
    insurancePeriod: '2025年11月1日〜2026年4月30日',
    paymentMethod: 'Vpassに登録のクレジットカード',
  },
};
