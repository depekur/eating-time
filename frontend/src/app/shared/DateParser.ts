import * as moment from 'moment';

export interface IParsedDate {
  date: Date;
  day: string;
  dayOfWeek: number;
  month: number|string;
  year: number;
  textShortDay: string;
  textDay: string;
  textMonth: string;
  timestamp: number;
}

const days = {
  shortDays: [
    'вс',
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб'
  ],
  fullDays: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ]
};

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Ноябрь',
  'Декабрь',
];

export class DateParser {
  static parse(date) {
    return {
      date: date.format('DD/MM/YYYY'),
      timestamp: date.unix()
    };
  }

  static today() {
    let today = moment().subtract(1, 'days').startOf('day');

    return DateParser.parse(today);
  }

  static nextDay(date) {
    let nextDate = moment.unix(date).add(1, 'day');

    return DateParser.parse(nextDate);
  }

  static prevDay(date) {
    let prevDate = moment.unix(date).subtract(1, 'day');

    return DateParser.parse(prevDate);
  }
}
