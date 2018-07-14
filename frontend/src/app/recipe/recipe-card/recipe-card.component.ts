import {Component, Input, OnInit} from '@angular/core';
import {ShortRecipe} from "../../shared/model/recipe.model";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: ShortRecipe;
  @Input() isLoggedIn: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
