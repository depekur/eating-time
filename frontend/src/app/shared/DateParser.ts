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
  static parse(timestamp: number): IParsedDate {
    let date = new Date(timestamp);

    return {
      timestamp: timestamp,
      date: date,
      day: (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`,
      dayOfWeek: ((date.getDay() === 0) ? 7 : date.getDay()),
      month: (date.getMonth()+1 < 10) ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`,
      year: date.getFullYear(),

      textShortDay: days.shortDays[date.getDay()],
      textDay: days.fullDays[date.getDay()],
      textMonth: months[date.getMonth()],
    };
  }

  static nextDay(timestamp: number) {
    let nextDate = new Date(timestamp + (24 * 60 * 60 * 1000)).getTime();

    return DateParser.parse(nextDate);
  }

  static prevDay(timestamp: number) {
    let prevDate = new Date(timestamp - (24 * 60 * 60 * 1000)).getTime();

    return DateParser.parse(prevDate);
  }
}
