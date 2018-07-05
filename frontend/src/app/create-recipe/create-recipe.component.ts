import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {counts, patterns} from "../shared/form-patterns";

import {Observable, Subscription} from "rxjs/Rx";
import {NgRedux, select} from "@angular-redux/store";
import {APP_EVENTS, IAppState} from "../store";
import {RecipeService} from '../shared/services/recipe.service';
import {CustomCategory, CustomDestination, CustomCountry} from "../shared/model/custom-select.model";
import { Ingredient, MEASURE } from "../shared/model/ingredient.model";
import {IngredientService} from "../shared/services/ingredient.service";
import {validationMessages} from "../shared/form-errors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  createRecipeForm;
 //@select('createRecipeForm') readonly createRecipeState: Observable<Recipe>;

  categoriesData = null;
  countriesData = null;
  destinationsData = null;

  filters$: Subscription;
  filters;
  isSending: boolean = false;
  isSubmitted: boolean = false;

  measures = MEASURE;
  errors = validationMessages;

  /**
   *  search ingredient
   */
  searchIngredients: any[] = [];
  searchIngredientTimeout;
  secondsBeforeSearch: number = 1000;
  isSearchBgVisible: boolean = false;

  isFileProcessing: boolean;

  constructor(private ngRedux: NgRedux<IAppState>,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private ingredientService: IngredientService,
              private router: Router) { }

  ngOnInit() {
    this.getInitData();
    this.initForm();
  }

  getInitData() {
    this.filters$ = this.recipeService
      .filters$
      .subscribe(data => {
        this.filters = data;
      });
  }

  initForm() {
    this.createRecipeForm = new FormGroup({
      title: new FormControl('', [Validators.required,]),
      body: new FormControl('', [Validators.required,]),
      cookingTime: new FormControl('', []),
      servingsCount: new FormControl('', []),
      calories: new FormControl('', []),
      photo: new FormControl('', [Validators.required,]),
      destinations: new FormControl('', []),
      categories: new FormControl('', []),
      countries: new FormControl('', []),
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([ ])
    });
  }

  createIngredient() {
    return new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', []),
      count: new FormControl('', []),
      measure: new FormControl('', []),
    });
  }

  createStep(stepId: number) {
    return new FormGroup({
      id: new FormControl(stepId, []),
      step_text: new FormControl('', []),
      step_photo: new FormControl('', [])
    });
  }

  toggleSelected(id, type) {
    if (this.createRecipeForm.value[type]) {
      const selected = this.createRecipeForm.value[type].filter(item => {
        return item.id !== id;
      });

      this.createRecipeForm.controls[type].setValue(selected);
    }
  }

  addNewIngredientFields() {
    this.createRecipeForm.get('ingredients').push(this.createIngredient());
  }

  addNewStepFields() {
    let stepId = this.createRecipeForm.get('steps').length + 1;

    this.createRecipeForm.get('steps').push(this.createStep(stepId));
  }

  removeIngredient(index) {
    this.createRecipeForm.get('ingredients').removeAt(index);
  }

  removeStep(index) {
    this.createRecipeForm.get('steps').removeAt(index);

    // if user delete not last step of n steps, the numbering of steps was broken
    // so we must change numbering in manual
    this.createRecipeForm.get('steps').controls.forEach((step, i) => {
      step.controls.id.setValue(i+1);
    });
  }

  searchIngredient(value, index) {
    this.searchIngredients[index] = null;
    this.isSearchBgVisible = false;

    if (value == '' && value.length < 3) { return; }

    clearTimeout(this.searchIngredientTimeout);

    this.searchIngredientTimeout = setTimeout(() => {
      this.ingredientService.searchIngredient(value).subscribe(
        ing => {
          this.searchIngredients[index] = ing.length ? ing : null;

          if (this.searchIngredients[index]) {
            this.isSearchBgVisible = true;
          }

          //console.log(this.searchIngredients);
        },
        error => {
          console.warn(error);
        }
      );
    }, this.secondsBeforeSearch);
  }

  selectIngFromSearch(ingredient, index) {
    this.createRecipeForm.get('ingredients').controls[index].controls.name.setValue(ingredient.name);
    this.createRecipeForm.get('ingredients').controls[index].controls.id.setValue(ingredient.id);
    this.closeSearch();
  }

  closeSearch() {
    this.searchIngredients = [];
    this.isSearchBgVisible = false;
  }

  updateIngredientState() {

  }

  onSubmit() {
    console.log(this.createRecipeForm.value);

    this.isSubmitted = true;

    if (!this.createRecipeForm.valid) { return; }

    this.isSending = true;

    this.recipeService.addRecipe(this.createRecipeForm.value)
      .subscribe(
        recipe => {
          this.isSending = false;
          this.isSubmitted = false;

          this.redirectToRecipe(recipe.id);
          console.log(recipe);
        },
        error => {
          this.isSending = false;
          this.isSubmitted = false;

          console.warn(error);
        }
      );
  }

  ngOnDestroy() {

  }

  redirectToRecipe(id) {
    this.router.navigate([`/recipe/${id}`]);
  }

  get title() { return this.createRecipeForm.get('title'); }
  get body() { return this.createRecipeForm.get('body'); }
  get calories() { return this.createRecipeForm.get('calories'); }
  get categories() { return this.createRecipeForm.get('categories'); }
  get cookingTime() { return this.createRecipeForm.get('cookingTime'); }
  get countries() { return this.createRecipeForm.get('countries'); }
  get destinations() { return this.createRecipeForm.get('destinations'); }
  get ingredients() { return this.createRecipeForm.get('ingredients'); }
  get photo() { return this.createRecipeForm.get('photo'); }
  get servingsCount() { return this.createRecipeForm.get('servingsCount'); }
  get password() { return this.createRecipeForm.get('password'); }
}
