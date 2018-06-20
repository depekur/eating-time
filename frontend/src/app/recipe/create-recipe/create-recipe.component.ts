import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {counts, patterns} from "../../shared/form-patterns";

import {Observable, Subscription} from "rxjs/Rx";
import {NgRedux, select} from "@angular-redux/store";
import {APP_EVENTS, IAppState} from "../../store";
import {RecipeService} from '../../services/recipe.service';
import { Recipe, RECIPE_META_TYPES, RecipeCategory, RecipeCountry, RecipeDestination } from '../../model/recipe.model';
import {CustomCategory, CustomDestination, CustomCountry} from "../../model/custom-select.model";
import { Ingredient } from "../../model/ingredient.model";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  createRecipeForm;
  @select('createRecipeForm') readonly createRecipeState: Observable<Recipe>;

  metaTypes = RECIPE_META_TYPES;

  categories = null;
  countries = null;
  destinations = null;

  metaSubscription: Subscription;

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
              private ingredientService: IngredientService) { }

  ngOnInit() {
    this.getInitData();
    this.initForm();
  }

  getInitData() {
    this.metaSubscription = this.recipeService
      .getRecipeMetaData()
      .subscribe(data => {
        this.categories = data.category.map((item) => new CustomCategory(item));
        this.countries = data.country.map((item) => new CustomCountry(item));
        this.destinations = data.destination.map((item) => new CustomDestination(item));
      });
  }

  initForm() {
    this.createRecipeForm = new FormGroup({
      title: new FormControl('', [Validators.required,]),
      body: new FormControl('', []),
      cookingTime: new FormControl('', []),
      servingsCount: new FormControl('', []),
      calories: new FormControl('', []),
      photo: new FormControl('', []),
      destinations: new FormControl('', []),
      categories: new FormControl('', []),
      countries: new FormControl('', []),
      ingredients: this.formBuilder.array([ this.createIngredient() ]),
      steps: this.formBuilder.array([ this.createStep() ])
    });
  }

  createIngredient() {
    return new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', []),
      count: new FormControl('', [])
    });
  }

  createStep() {
    return new FormGroup({
      id: new FormControl('', []),
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
    this.createRecipeForm.get('steps').push(this.createStep());
  }

  removeIngredient(index) {
    this.createRecipeForm.get('ingredients').removeAt(index);
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

          console.log(this.searchIngredients);
        },
        error => {
          console.warn(error);
        }
      );
    }, this.secondsBeforeSearch);
  }

  selectIngFromSearch(ingredient, index) {
    this.createRecipeForm.get('ingredients').controls[index].controls.name.setValue(ingredient.name);
    this.closeSearch();
  }

  closeSearch() {
    this.searchIngredients = [];
    this.isSearchBgVisible = false;
  }

  updateIngredientState() {

  }

  onSubmit() {
    console.log(this.createRecipeForm);
  }

  ngOnDestroy() {

  }

}
