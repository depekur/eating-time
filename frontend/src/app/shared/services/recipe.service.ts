import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs/index';
import {apiUrls} from "../../app-config";
import {ReplaySubject} from "rxjs/Rx";

interface createRecipeResponse {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  data;

  RECIPE_META_FIELDS = {
    META: 'recipeMeta',
    INGREDIENTS: 'ingredients'
  };

  meta = new ReplaySubject<any>();
  ingredients = new ReplaySubject<any>();


  constructor(private http: HttpClient) {
    this.getRecipesData();
  }

  getRecipes(page, query?): Observable<any> {
    return this.http.post(`${apiUrls.recipe.all}${page}`, 'test');
  }

  getSingleRecipe(id: number): Observable<any> {
    return this.http.get(apiUrls.recipe.single + id);
  }

  addRecipe(data): Observable<any> {
    return this.http.post(apiUrls.recipe.add, data);
  }

  getRecipeMetaData(): Observable<any> {
    return this.meta.asObservable();
  }

  getRecipeIngredients(): Observable<any> {
    return this.ingredients.asObservable();
  }

  getFromStorageOrHttp(type: string): Observable<any> {
    if (this.hasDataInStore(type)) {
      this.data = this.getFromStore(type);
      this.data = of(JSON.parse(this.data));
    } else {
      this.data = this.http.get(apiUrls[type]);
    }

    return this.data;
  }

  getRecipesData() {
    this.getFromStorageOrHttp(this.RECIPE_META_FIELDS.META)
      .subscribe(
        data => {
          this.saveToStorage(this.RECIPE_META_FIELDS.META, data);

          this.meta.next(data);
        },
        error => {
          console.error(error);
        });

    // this.getFromStorageOrHttp(this.RECIPE_META_FIELDS.INGREDIENTS)
    //   .subscribe(
    //     data => {
    //       this.saveToStorage(this.RECIPE_META_FIELDS.INGREDIENTS, data);
    //
    //       this.ingredients.next(data);
    //     },
    //     error => {
    //       console.error(error);
    //     });
  }

  saveToStorage(type, data) {
    if (!this.hasDataInStore(type)) {
      localStorage.setItem(type, JSON.stringify(data));
    }
  }

  private getFromStore(fieldName: string) {
    return localStorage.getItem(fieldName);
  }

  private hasDataInStore(fieldName: string): boolean {
    return !!this.getFromStore(fieldName);
  }
}
