import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../shared/services/recipe.service";
import { storageUrl } from "../../app-config";
import { ShortRecipe } from "../../shared/model/recipe.model";
import { Paginator } from "../../shared/model/pagination.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: ShortRecipe[];
  paginator: Paginator = {
    current_page: 1
  };

  photoStorageUrl = storageUrl;

  isLoadingMore: boolean = false;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  // todo sort filters
  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes(this.paginator.current_page).subscribe(
      data => {
        this.recipes = data.data;

        this.paginator.current_page = data.current_page;
        this.paginator.last_page = data.last_page;
        this.paginator.per_page = data.per_page;
        this.paginator.total = data.total;


        // console.log('recipes', this.recipes);
        // console.log('paginator', this.paginator);
      },
      error => {
        console.warn(error);
      }
    );
  }

  loadMore() {
    this.isLoadingMore = true;

    let pageNumber = this.paginator.current_page + 1;

    if (this.paginator.current_page === this.paginator.last_page) { return; }
    if (pageNumber > this.paginator.last_page) { return; }

    this.recipeService.getRecipes(pageNumber).subscribe(
      data => {
        this.isLoadingMore = false;

        this.paginator.current_page = data.current_page;
        this.recipes = this.recipes.concat(data.data);
      },
      error => {
        this.isLoadingMore = false;

        console.warn(error);
      }
    );
  }

}
