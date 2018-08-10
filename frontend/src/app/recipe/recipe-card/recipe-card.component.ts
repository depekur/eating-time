import {Component, Input, OnInit} from '@angular/core';
import {IShortRecipe} from "../model/recipe.model";
import {Observable} from "rxjs/Rx";
import {APP_EVENTS, IAppState} from "../../store";
import {NgRedux} from "@angular-redux/store";

export interface IDropData {
  recipeId: string;
  recipeTitle: string;
}

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: IShortRecipe;
  @Input() isLoggedIn: Observable<boolean>;

  dropData: IDropData;
  dragged: boolean = false;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.dropData = {
      recipeId: this.recipe.id,
      recipeTitle: this.recipe.title
    }
  }

  addRecipeToRation() {
    let recipe = {
      recipeId: this.recipe.id,
      recipeTitle: this.recipe.title
    };
    this.ngRedux.dispatch({type: APP_EVENTS.ADD_RECIPE_TO_RATION, body: recipe});
  }
}
