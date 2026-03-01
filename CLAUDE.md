# Vpass インフルエンザ保険 申し込みUI プロトタイプ

## プロジェクト概要
三井住友カード（SMCC）のVpassアプリ向け「インフルエンザお見舞い金保険」申し込みUI。
React + Tailwind CSS v4 + lucide-react で構築。最終的に単一JSXファイルとして出力。

## 技術スタック
- React (Vite)
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- lucide-react (アイコン)
- 状態管理: useState / useReducer のみ

## デザイントークン（Tailwindカスタムカラー）
- `smcc-green`: #00875A （プライマリ、CTA、ヘッダー）
- `smcc-green-dark`: #006B47 （hover、アクティブ）
- `smcc-green-light`: #E8F5EE （背景ハイライト、選択中プラン背景）
- `accent-orange`: #E8960C （おすすめバッジ）
- `accent-red`: #DC2626 （金額強調、エラー）

## 画面フロー（5ステップ）
1. STEP 1: 商品紹介LP（LandingPage）
2. STEP 2: プラン選択（PlanSelect）
3. STEP 3: お客様情報（UserInfo）
4. STEP 4: 確認・同意（Confirm）
5. STEP 5: 完了（Complete）

## ファイル担当ルール
- **Designer**: `src/design-system.js`, `src/components/ui/*`
- **Developer**: `src/App.jsx`, `src/screens/*`, `src/hooks/*`
- **Planner**: `src/data/*`, `docs/*`
- 各Teammateは担当外のファイルを編集しないこと

## コンポーネント規約
- JSX拡張子を使用（.tsx不使用）
- データファイルは .js 拡張子（.ts不使用）
- Tailwindユーティリティクラスでスタイリング
- ボタン最小高さ48px、フォント最小12px
- 角丸: カード12px、ボタン8px、バッジ20px

## 3プラン構成
| プラン | 月額 | 治療保険金 | 入院保険金 |
|--------|------|-----------|-----------|
| お手軽 | 250円 | 3,000円 | 30,000円 |
| 基本   | 350円 | 5,000円 | 30,000円 |
| 安心   | 480円 | 7,000円 | 30,000円 |
デフォルト選択: 安心プラン

## エクスポート規約
- データ: named export（例: `export const plans = [...]`）
- コンポーネント: default export
- フック: named export
