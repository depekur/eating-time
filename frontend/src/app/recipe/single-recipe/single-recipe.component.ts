import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../shared/services/recipe.service";
import {storageUrl} from "../../app-config";

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipeId: number;
  recipe;
  photoStorageUrl = storageUrl;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {

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
      data => {
        this.recipe = data;
        //console.log(data);
      },
      error => {
        console.warn(error);
      }
    );
  }
}
