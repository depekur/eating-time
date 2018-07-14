import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { apiUrls } from "../../app-config";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRecipeService {

  constructor(private http: HttpClient) { }

  addToFavorite(params): Observable<any> {
    return this.http.post(apiUrls.recipe.favorite, params);
  }

  deleteFromFavorites(params) {
    return this.http.delete(`${apiUrls.recipe.favorite}/${params.recipeId}`);
  }
}
