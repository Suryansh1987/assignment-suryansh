// Common crop types in Japan
export const CROP_TYPES = [
  { value: 'rice', label: '米' },
  { value: 'tomato', label: 'トマト' },
  { value: 'cucumber', label: 'キュウリ' },
  { value: 'eggplant', label: 'ナス' },
  { value: 'cabbage', label: 'キャベツ' },
  { value: 'lettuce', label: 'レタス' },
  { value: 'spinach', label: 'ほうれん草' },
  { value: 'carrot', label: '人参' },
  { value: 'radish', label: '大根' },
  { value: 'potato', label: 'じゃがいも' },
  { value: 'sweet_potato', label: 'さつまいも' },
  { value: 'onion', label: '玉ねぎ' },
  { value: 'strawberry', label: 'いちご' },
  { value: 'melon', label: 'メロン' },
  { value: 'watermelon', label: 'スイカ' },
  { value: 'apple', label: 'りんご' },
  { value: 'pear', label: '梨' },
  { value: 'peach', label: '桃' },
  { value: 'grape', label: 'ぶどう' },
] as const;

// Farming methods
export const FARMING_METHODS = [
  { value: 'organic', label: '有機農法' },
  { value: 'greenhouse', label: '温室栽培' },
  { value: 'open_field', label: '露地栽培' },
  { value: 'hydroponic', label: '水耕栽培' },
  { value: 'conventional', label: '慣行農法' },
  { value: 'reduced_pesticide', label: '減農薬栽培' },
  { value: 'natural_farming', label: '自然農法' },
] as const;

// Japanese prefectures
export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const;
