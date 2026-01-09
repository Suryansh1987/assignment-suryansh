export const APP_NAME = 'AgriSense AI';

export const UI_TEXT = {
  auth: {
    signup: 'アカウント登録',
    signin: 'ログイン',
    signout: 'ログアウト',
    email: 'メールアドレス',
    password: 'パスワード',
    name: '名前',
    city: '市区町村',
    prefecture: '都道府県',
    haveAccount: '既にアカウントをお持ちの方',
    noAccount: 'アカウントをお持ちでない方',
    signinLink: 'ログインはこちら',
    signupLink: '新規登録はこちら',
  },
  chat: {
    newChat: '新しいチャット',
    sendMessage: '送信',
    placeholder: 'メッセージを入力してください...',
    voiceInput: '音声入力',
    deleteSession: 'チャットを削除',
    confirmDelete: '本当に削除しますか？',
    noSessions: 'チャット履歴がありません',
    startNewChat: '新しいチャットを開始してください',
  },
  profile: {
    title: 'プロフィール',
    farmDetails: '農場情報',
    farmSize: '農地面積',
    cropTypes: '栽培作物',
    farmingMethods: '農法',
    saveChanges: '変更を保存',
    updateSuccess: 'プロフィールを更新しました',
  },
  dashboard: {
    welcome: 'ようこそ、',
    recentChats: '最近のチャット',
    weatherTitle: '現在の天気',
    quickActions: 'クイックアクション',
  },
  weather: {
    temperature: '気温',
    humidity: '湿度',
    condition: '天気',
    rainfall: '降水量',
  },
  errors: {
    required: 'この項目は必須です',
    invalidEmail: '有効なメールアドレスを入力してください',
    passwordTooShort: 'パスワードは8文字以上にしてください',
    networkError: 'ネットワークエラーが発生しました',
    serverError: 'サーバーエラーが発生しました',
    unknownError: '予期しないエラーが発生しました',
  },
  common: {
    loading: '読み込み中...',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    close: '閉じる',
    confirm: '確認',
  },
};

export const CROP_TYPES = [
  { value: '米', label: '米' },
  { value: 'トマト', label: 'トマト' },
  { value: 'キュウリ', label: 'キュウリ' },
  { value: 'ナス', label: 'ナス' },
  { value: 'キャベツ', label: 'キャベツ' },
  { value: 'レタス', label: 'レタス' },
  { value: 'ほうれん草', label: 'ほうれん草' },
  { value: '人参', label: '人参' },
  { value: '大根', label: '大根' },
  { value: 'じゃがいも', label: 'じゃがいも' },
];

export const FARMING_METHODS = [
  { value: '有機農法', label: '有機農法' },
  { value: '温室栽培', label: '温室栽培' },
  { value: '露地栽培', label: '露地栽培' },
  { value: '水耕栽培', label: '水耕栽培' },
  { value: '慣行農法', label: '慣行農法' },
  { value: '減農薬栽培', label: '減農薬栽培' },
];

export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];
