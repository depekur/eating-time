import {Ingredient} from "./ingredient.model";
import { User } from "./user.model";
import {Paginator} from "./pagination.model";

export interface RecipesResponse {
  paginator: Paginator;
  recipes: ShortRecipe[];
}

export interface ShortRecipe {
  id: string;
  img: string;
  title: string;
  calories: number;
  favorites: boolean;
  cookingTime: number;
  servingsCount: number;
  categories: RecipeCategory[];
  destinations: RecipeDestination[];
}

export interface FullRecipe {
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
  country: RecipeCountry;
  categories: RecipeCategory[];
  destinations: RecipeDestination[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

export interface RecipeCategory {
  id: number;
  name: string;
}

export interface RecipeDestination {
  id: number;
  name: string;
}

export interface RecipeCountry {
  id: number;
  name: string;
}

export interface RecipeStep {
  id: number;
  body: string;
  img: string;
}
