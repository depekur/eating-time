import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {counts, patterns} from "../../shared/form-patterns";

import {Observable, Subscription} from "rxjs/Rx";
import {RecipeService} from '../service/recipe.service';
import {validationMessages} from "../../shared/form-errors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  createRecipeForm;
  categoriesData = null;
  countriesData = null;
  destinationsData = null;

  filters$: Subscription;
  filters;
  isSending: boolean = false;
  isSubmitted: boolean = false;

  errors = validationMessages;


  isFileProcessing: boolean;

  constructor(private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.getInitData();
    this.initForm();
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
      ingredients: new FormControl('', []),
      steps: this.formBuilder.array([ this.createStep(1), this.createStep(2)])
    });
  }


  createStep(stepId: number): FormGroup {
    return new FormGroup({
      id: new FormControl(stepId, []),
      step_text: new FormControl('', []),
      step_photo: new FormControl('', [])
    });
  }

  toggleSelected(id, type): void {
    if (this.createRecipeForm.value[type]) {
      const selected = this.createRecipeForm.value[type].filter(item => {
        return item.id !== id;
      });

      this.createRecipeForm.controls[type].setValue(selected);
    }
  }

  addQuantityToIng(id: number, quantity): void {
    let ingredients = this.createRecipeForm.controls.ingredients.value;

    ingredients.forEach(ing => {
      if (ing.id === id) {
        ing.quantity = quantity;
      }
    });

    this.createRecipeForm.controls.ingredients.setValue(ingredients);
  }

  addNewStepFields() {
    let stepId = this.createRecipeForm.get('steps').length + 1;

    this.createRecipeForm.get('steps').push(this.createStep(stepId));
  }

  removeStep(index) {
    this.createRecipeForm.get('steps').removeAt(index);

    // if user delete not last step of n steps, the numbering of steps was broken
    // so we must change numbering in manual
    this.createRecipeForm.get('steps').controls.forEach((step, i) => {
      step.controls.id.setValue(i+1);
    });
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
