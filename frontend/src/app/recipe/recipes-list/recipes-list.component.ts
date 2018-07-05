import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../shared/services/recipe.service";
import { ShortRecipe, RecipesResponse } from "../../shared/model/recipe.model";
import { Paginator } from "../../shared/model/pagination.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: ShortRecipe[];
  paginator: Paginator;

  isLoadingMore: boolean = false;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  // todo sort filters
  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes(1).subscribe(
      (data: RecipesResponse) => {
        this.recipes = data.recipes;
        this.paginator = data.paginator;
      },
      error => {
        console.warn(error);
      }
    );
  }

  loadMore() {
    this.isLoadingMore = true;

    if (!this.paginator.nextPage) { return; }

    this.recipeService.getRecipes(this.paginator.nextPage).subscribe(
      (data: RecipesResponse) => {
        this.isLoadingMore = false;

        this.paginator = data.paginator;
        this.recipes = this.recipes.concat(data.recipes);
      },
      error => {
        this.isLoadingMore = false;

        console.warn(error);
      }
    );
  }

}
