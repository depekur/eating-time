import {Ingredient} from "./ingredient.model";

export const CokingTimeMeasure = [
  'мин.',
  'ч.',
  'д'
];

export interface ShortRecipe {
  calories: number;
  cooking_time: number;
  destinations: {
    destination_id: number;
    name: string;
  };
  categories: {
    category_id: number;
    category_name: string;
  };
  img_name: string;
  is_short_recipe: string;
  recipe_id: string;
  recipe_link: string;
  seo_description: string;
  servings_count: number;
  title: string;
  user_id: number;
}


export const RECIPE_META_TYPES = {
  COUNTRIES: 'countriesData',
  DESTINATIONS: 'destinationsData',
  CATEGORIES: 'categoriesData',
  INGREDIENTS: 'ingredients'
};

export class RecipeCategory {
  id: number;
  name: string;
  parentId: number;

  constructor(recipeData) {
    if (recipeData) {
      this.id = recipeData.id;
      this.name = recipeData.name;
    }
  }
}

export class RecipeDestination {
  id: number;
  name: string;

  constructor(recipeData) {
    if (recipeData) {
      this.id = recipeData.id;
      this.name = recipeData.name;
    }
  }
}

export class RecipeCountry {
  id: number;
  name: string;

  constructor(recipeData?: any) {
    if (recipeData) {
      this.id = recipeData.id;
      this.name = recipeData.name;
    }
  }
}

export class Recipe {
  title: string;
  body: string;
  is_short_recipe: boolean;
  calories: number;
  cooking_time: number;
  user_id: number;
  img: string;
  recipe_link?: string;
  servingsCount: number;

  country: RecipeCountry;
  categories: RecipeCategory[];
  destinations: RecipeDestination[];

  ingredients: Ingredient[];
  steps: RecipeStep[];

  comments;
  raiting;

  constructor(recipeData?: any) {
    if (recipeData) {
      this.title = recipeData.title;
      this.body = recipeData.body;
      this.is_short_recipe = recipeData.is_short_recipe;
      this.calories = recipeData.calories;
      this.cooking_time = recipeData.cooking_time;

      this.country.id = recipeData.country.id;
      this.country.name = recipeData.country.name;

      this.user_id = recipeData.user_id;
      this.img = recipeData.img;
      this.recipe_link = recipeData.recipe_link;
      this.servingsCount = recipeData.servingsCount;

      this.categories = recipeData.categoriesData;
      this.destinations = recipeData.destinationsData;

      this.ingredients = recipeData.ingredients.map(ing => new Ingredient(ing)) || [];
      this.steps = stepsFactory(recipeData.steps) || [];
    }
  }
}

export class RecipeStep {
  number: number;
  description: string;
  img: string;

  constructor(stepData?: any) {
    if (stepData) {
      this.number = stepData.number;
      this.description = stepData.description;
      this.img = stepData.img;
    }
  }
}

export class RecipeIngredient {
  ingId: number;
  ingName: string;
  ingCount: string;
  ingMeasure: string;

  constructor(ingData?: any) {
    if (ingData) {
      this.ingId = ingData.ingId;
      this.ingName = ingData.ingName;
      this.ingCount = ingData.ingCount;
      this.ingMeasure = ingData.ingMeasure;
    }
  }
}

function stepsFactory(stepData): RecipeStep[] {
  let steps = [];

  stepData.map(step => {
    steps.push(new RecipeStep(step));
  });

  return steps;
}
