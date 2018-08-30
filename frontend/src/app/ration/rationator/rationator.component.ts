import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DateParser} from "../../shared/DateParser";
import {RationService} from "../service/ration.service";
import {IRationDay, IEating, IDish, RationDay} from "../model/ration.model";
import {Observable} from "rxjs/Rx";
import {NgRedux, select} from "@angular-redux/store";
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {APP_EVENTS, IAppState} from "../../store";

export interface ICurrentDate {
  date: string;
  timestamp: number;
}

@Component({
  selector: 'rationator',
  templateUrl: './rationator.component.html',
  styleUrls: ['./rationator.component.scss']
})
export class RationatorComponent implements OnInit, OnDestroy {
  @Input() currentDay: number;
  currentDate: ICurrentDate;

  eatingNames = [
    'завтрак',
    'полдник',
    'обед',
    'перекус',
    'ужин',
  ];

  eatingRecommendation = [
    'манная каша, яйца, бутерброды с сыром',
    'яблоко, булочка, банан',
    'борщ, пюрешка, котлетки',
    'шаурма, бургер, чипсы',
    'творог, стейк, курица',
  ];

  settings;
  activeEating;
  @select() readonly settings$: Observable<any>;
  @select() readonly activeEating$: Observable<number>;
  @select('currentRationDishes') currentRationDishes$: Observable<any>;

  rationDay: IRationDay = {};
  isDragged: boolean[] = [false, false, false, false, false];

  getRationTimer;
  saveRationTimer;
  requestTimeout = 500;
  isLoading: boolean = false;
  isSaved: boolean = true;

  constructor(private rationService: RationService,
              private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.settings$.subscribe((s) => {
      this.settings = s;
    });

    this.currentRationDishes$.subscribe((food) => {
      if (food.length) {
        this.rationDay.food = food;

        this.saveDayRation();
      }
    });

    this.currentDate = DateParser.today();
    this.updateCurrentDateState();
    this.getDayRation(this.currentDate.timestamp);
  }

  prevDay() {
    this.currentDate = DateParser.prevDay(this.currentDate.timestamp);
    this.getDayRation(this.currentDate.timestamp);
    this.updateCurrentDateState();
  }

  nextDay() {
    this.currentDate = DateParser.nextDay(this.currentDate.timestamp);
    this.getDayRation(this.currentDate.timestamp);
    this.updateCurrentDateState();
  }

  getDayRation(date): void {
    this.isLoading = true;
    clearTimeout(this.getRationTimer);

    this.getRationTimer = setTimeout(() => {

      this.rationService.getDayRation(date).subscribe(
        (data: IRationDay) => {
          this.rationDay = new RationDay(data, this.settings);
          this.isLoading = false;

          this.updateDishState();
        },
        error => {
          // todo error logging
          console.warn(error);
          this.isLoading = false;
        }
      );

    }, this.requestTimeout);
  }

  onDropRecipe(droppedData, eatingOrder) {
    let inMenu = false;
    let droppedDish: IDish = {
      dishOrder: this.rationDay.food[eatingOrder].dishes.length + 1,
      recipeId: droppedData.recipeId,
      recipeTitle: droppedData.recipeTitle,
    };

    this.rationDay.food[eatingOrder].dishes.forEach(dish => {
      if (dish.recipeId === droppedDish.recipeId) {
        inMenu = true;
      }
    });

    if (!inMenu) {
      this.rationDay.food[eatingOrder].dishes.push(droppedDish);

      this.updateDishState();
      this.saveDayRation();
    }
  }

  // todo кнопочка удаления рецептов из рациона
  saveDayRation() {
    this.isSaved = false;
    clearTimeout(this.saveRationTimer);

    this.saveRationTimer = setTimeout(() => {
      this.rationService.updateRation(this.rationDay).subscribe(
        res => {
          this.isSaved = false;
        },
        error => {
          //todo error logging
          console.warn(error);

          this.isSaved = false;
        });
    });
  }

  updateActiveEating(i) {
    this.ngRedux.dispatch({type: APP_EVENTS.UPDATE_ACTIVE_EATING, body: i});
  }

  updateDishState() {
    this.ngRedux.dispatch({type: APP_EVENTS.UPDATE_CURRENT_RATION, body: this.rationDay.food});
  }

  updateCurrentDateState() {
    this.ngRedux.dispatch({type: APP_EVENTS.UPDATE_CURRENT_DATE, body: this.currentDate.timestamp});
  }

  ngOnDestroy() {

  }

}
