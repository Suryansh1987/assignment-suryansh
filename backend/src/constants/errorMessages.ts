export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: '認証情報が正しくありません',
    emailExists: 'このメールアドレスは既に登録されています',
    userNotFound: 'ユーザーが見つかりません',
    tokenExpired: 'トークンの有効期限が切れています',
    tokenInvalid: '無効なトークンです',
    unauthorized: '認証が必要です',
  },
  chat: {
    sessionNotFound: 'チャットセッションが見つかりません',
    messageRequired: 'メッセージを入力してください',
    aiError: 'AI応答の生成中にエラーが発生しました',
    sessionCreateError: 'セッションの作成に失敗しました',
  },
  user: {
    updateFailed: 'プロフィールの更新に失敗しました',
    notFound: 'ユーザーが見つかりません',
  },
  weather: {
    fetchError: '天気情報の取得に失敗しました',
    invalidLocation: '無効な位置情報です',
  },
  validation: {
    required: '{field}は必須です',
    invalid: '{field}が無効です',
  },
  server: {
    internal: 'サーバーエラーが発生しました',
    databaseError: 'データベースエラーが発生しました',
  },
} as const;
