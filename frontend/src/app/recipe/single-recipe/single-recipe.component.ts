import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../service/recipe.service";
import { IFullRecipe } from "../model/recipe.model";
import { RationCrudService } from '../service/ration-crud.service';
import { INFO_MESSAGE_TYPE, InfoMessage } from '../../shared/components/info-message/info-message.model';
import { APP_EVENTS, IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipeId: number;
  recipe: IFullRecipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private rationService: RationCrudService,
              private ngRedux: NgRedux<IAppState>) {

    this.route.params.subscribe(
      params => {
        this.recipeId = params.id;
      }
    );
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeService.getSingleRecipe(this.recipeId).subscribe(
      (data: IFullRecipe) => {
        this.recipe = data;
      },
      error => {
        // todo server logging
        console.warn(error);
      }
    );
  }

  addRecipeToRation() {
    this.rationService.addRecipe(this.recipe.id, this.recipe.title);
  }
}
