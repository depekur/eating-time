export interface Ingredient {
  id: number;
  name: string;

  category?: string;
  calories?: number;
  fat?: string;
  proteins?: string;
  carbs?: string;

  count?: string;
  measure?: string;
}

export const MEASURE = [
  'по вкусу',
  'г',
  'шт',
  'ст. л.',
  'ч. л.',
  'стак.',
  'мл',
  'зуб.',
  'кг',
  'пуч.',
  'бан.',
  'л',
  'пакет.',
  'пач.',
  'горст.',
  'упак.',
  'щепот.',
  'ломт.',
  'вилок',
  'веточ.',
  'дол.',
  'бут.',
  'капл.'
];
