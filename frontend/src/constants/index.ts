export const VALIDATION = {
  TITLE_MAX_LENGTH: 120,
  NOTES_MAX_LENGTH: 500,
  AMOUNT_MIN: 0.01,
} as const;

export const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-800',
  Travel: 'bg-blue-100 text-blue-800',
  Software: 'bg-purple-100 text-purple-800',
  Equipment: 'bg-orange-100 text-orange-800',
  'Office Supplies': 'bg-yellow-100 text-yellow-800',
  Marketing: 'bg-pink-100 text-pink-800',
  Other: 'bg-gray-100 text-gray-800',
} as const;
