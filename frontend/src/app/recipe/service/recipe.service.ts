import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs/index';
import {apiUrls} from "../../app-config";
import {ReplaySubject} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  data;
  filtersField = 'filters';
  filters = new ReplaySubject<any>();

  constructor(private http: HttpClient) {
    this.getRecipesMetaData();
  }

  get filters$(): Observable<any> {
    return this.filters.asObservable();
  }

  getRecipes(page, query?): Observable<any> {
    let options = { params: new HttpParams().set('page', page) };

    if (query) {
      options.params = this.prepareQuery(query, options);
    }

    return this.http.get(apiUrls.recipe.all, options);
  }

  private prepareQuery(query, options): HttpParams {
    Object.keys(query).forEach((paramName) => {
      if (paramName === 'query' && query[paramName]) {
        options.params = options.params.append(paramName, query[paramName]);
      } else if (paramName == 'random' && query[paramName]) {
        options.params = options.params.append(paramName, query[paramName]);
      } else if (query[paramName]) {
        let params = '';

        query[paramName].forEach((param, index) => {
          params += `${param.id}`;

          if (query[paramName].length !== index+1) {
            params += `,`;
          }
        });

        options.params = options.params.append(paramName, params);
      }
    });

    return options.params;
  }

  getSingleRecipe(id: number): Observable<any> {
    return this.http.get(apiUrls.recipe.single + id);
  }

  addRecipe(data): Observable<any> {
    return this.http.post(apiUrls.recipe.add, data);
  }

  getRecipesMetaData() {
    this.getFromStorageOrHttp(this.filtersField)
      .subscribe(
        data => {
          this.saveToStorage(this.filtersField, data);

          this.filters.next(data);
        },
        error => {
          console.error(error);
        });
  }

  private getFromStorageOrHttp(type: string): Observable<any> {
    if (this.hasDataInStore(type)) {
      this.data = this.getFromStore(type);
      this.data = of(JSON.parse(this.data));
    } else {
      this.data = this.http.get(apiUrls[type]);
    }

    return this.data;
  }

  private saveToStorage(type, data) {
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
