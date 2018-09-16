import {Component, Input, OnInit} from '@angular/core';
import {IShortRecipe} from "../model/recipe.model";
import {Observable} from "rxjs/Rx";
import { RationCrudService } from '../service/ration-crud.service';

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

  constructor(private rationService: RationCrudService) {
  }

  ngOnInit() {
    this.dropData = {
      recipeId: this.recipe.id,
      recipeTitle: this.recipe.title
    }
  }

  addRecipeToRation() {
    this.rationService.addRecipe(this.recipe.id, this.recipe.title);
  }
}
