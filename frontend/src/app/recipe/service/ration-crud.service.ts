import { Injectable } from '@angular/core';
import { APP_EVENTS, IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

export class RationRecipe {
  constructor(private recipeId: number,
              private recipeTitle: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class RationCrudService {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  addRecipe(id, title) {
    this.ngRedux.dispatch({
        type: APP_EVENTS.ADD_RECIPE_TO_RATION,
        body: new RationRecipe(id, title)
      });
  }

  removeRecipe() {

  }
}
