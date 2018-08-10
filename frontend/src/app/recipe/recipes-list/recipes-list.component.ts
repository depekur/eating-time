import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../service/recipe.service";
import { IShortRecipe, IRecipesResponse } from "../model/recipe.model";
import { IPaginator } from "../../shared/model/pagination.model";
import {Observable, Subscription} from "rxjs/Rx";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select} from "@angular-redux/store";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  @select() readonly isLoggedIn: Observable<boolean>;

  recipes: IShortRecipe[];
  paginator: IPaginator;

  isLoading: boolean = false;
  isFiltering: boolean = false;

  filters$: Subscription;
  filters;
  showFilters: boolean = false;
  filtersForm: FormGroup;
  filtersTimeout;
  pauseBeforeFilter: number = 500;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRecipes();
    this.getInitData();
    this.initFiltersForm();
  }

  ngOnDestroy() {
    this.filters$.unsubscribe();
  }

  getInitData() {
    this.filters$ = this.recipeService
      .filters$
      .subscribe(data => {
        this.filters = data;
      });
  }

  getRecipes(query: any = false) {
    this.isLoading = true;

    this.recipeService.getRecipes(1, query).subscribe(
      (data: IRecipesResponse) => {
        this.recipes = data.recipes;
        this.paginator = data.paginator;

        this.isLoading = false;
      },
      error => {
        //todo logging
        console.warn(error);

        this.isLoading = false;
      }
    );
  }


  //todo fulltext search of ingredients, steps, body
  //todo stemming
  initFiltersForm() {
    this.filtersForm = new FormGroup({
      query: new FormControl('', []),
      destinations: new FormControl('', []),
      categories: new FormControl('', []),
      countries: new FormControl('', []),
      ingredients: new FormControl('', [])
    });
  }

  proceedFilters() {
    if (this.filtersForm.touched || this.filtersForm.controls.query.value) {
      clearTimeout(this.filtersTimeout);

      this.filtersTimeout = setTimeout(() => {
        this.getRecipes(this.filtersForm.value);
      }, this.pauseBeforeFilter);
    }
  }

  toggleSelectedFilters(id, type): void {
    if (this.filtersForm.value[type]) {
      const selected = this.filtersForm.value[type].filter(item => {
        return item.id !== id;
      });

      this.filtersForm.controls[type].setValue(selected);
    }
  }

  loadMore() {
    this.isLoading = true;

    if (!this.paginator.nextPage) { return; }

    this.recipeService.getRecipes(this.paginator.nextPage).subscribe(
      (data: IRecipesResponse) => {
        this.isLoading = false;

        this.paginator = data.paginator;
        this.recipes = this.recipes.concat(data.recipes);
      },
      error => {
        this.isLoading = false;

        console.warn(error);
      }
    );
  }
}
