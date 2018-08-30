import * as moment from 'moment';

export interface IGetRationRequest {
  date: string;
}

export interface IGetRationIntervalRequest {
  startDate: string;
  endDate: string;
}

export interface IDeleteRationRequest {
  date: number;
}

export interface IRation {

}

/**
 *  response and request to get\set day ration
 */
export interface IRationDay {
  date?: number;
  food?: IEating[];
}

export interface IEating {
  eatingOrder: number;
  eatingTime?: any;
  textBody?: string;
  dishes?: IDish[]|any;
}

export interface IDish {
  dishOrder: number;
  recipeId: number;
  recipeTitle?: string;
  weight?: string;
  price?: IDishPrice;
}

export interface IDishPrice {
  value: number;
  measure: string;
}

export class RationDay implements IRationDay {
  date: number;
  food: IEating[];

  constructor(data, eatingTime) {
    this.date = data.date;
    this.food = data.food.length ? data.food : getDefaultFood(data.date, eatingTime);
  }
}

function getDefaultFood(date, eatingTime) {
  let food = [];

  for (let i = 1; i <= 5; i++) {
    food.push({
        eatingOrder: i,
        eatingTime: setTime(date, eatingTime[i-1]),
        dishes: [],
        textBody: ''
    });
  }

  return food;
}

function setTime(date, time) {
  let t = moment.unix(date)
          .subtract(1, 'days')
          .startOf('day')
          .hours(time.hours)
          .minute(time.minutes);

  return {
    timestamp: t.unix(),
    time: t.format('HH:mm')
  };
}


let dishes = [
    {
      dishOrder: 1,
      eatingOrder: 1,
      recipeId: 1,
      recipeTitle: '', // не записывать в базу - подтягивать для каждого
      recipeCount: '' // кол-во или че там я хотел для рецептиков
    },
];

// todo новое json поле в базе рациона
// сохранять вместе с рационом - мы ведь не можем поменять время вчерашнего завтрака
// новые настройки подсасывать только для новой даты
// менять даты отдельно для каждого дня!
let eatingTime = [
    {hours: 7, minutes: 30},
    {hours: 10, minutes: 0},
    {hours: 13, minutes: 0},
    {hours: 17, minutes: 0},
    {hours: 20, minutes: 0},
];



