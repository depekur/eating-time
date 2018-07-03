import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {apiUrls} from "../../app-config";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getCategories() {

  }

  getPaginatedIngredients() {

  }

  searchIngredient(value: string): Observable<any> {
    return this.http.get(`${apiUrls.ingredients}${value}`);
  }
}
