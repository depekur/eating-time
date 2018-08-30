import {Ingredient} from "../../shared/model/ingredient.model";
import { User } from "../../shared/model/user.model";
import {IPaginator} from "../../shared/model/pagination.model";

export interface IRecipesResponse {
  paginator: IPaginator;
  recipes: IShortRecipe[];
}

export interface IShortRecipe {
  id: string;
  img: string;
  title: string;
  calories: number;
  favorites: boolean;
  cookingTime: number;
  servingsCount: number;
  ingredients: Ingredient[];
  categories: IRecipeCategory[];
  destinations: IRecipeDestination[];
}

export interface IFullRecipe {
  id: number;
  title: string;
  body: string;
  servingsCount: number;
  calories: number;
  cookingTime: number;
  img: string;
  favorites: boolean;
  recipeLink?: string;
  isShortRecipe: boolean;
  comments; // todo implement comments ??? and move to another request ???
  rating; // todo implement rating
  user: User;
  country: IRecipeCountry;
  categories: IRecipeCategory[];
  destinations: IRecipeDestination[];
  ingredients: Ingredient[];
  steps: IRecipeStep[];
}

export interface IRecipeCategory {
  id: number;
  name: string;
}

export interface IRecipeDestination {
  id: number;
  name: string;
}

export interface IRecipeCountry {
  id: number;
  name: string;
}

export interface IRecipeStep {
  id: number;
  body: string;
  img: string;
}
