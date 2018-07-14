import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteRecipeComponent } from './favorite-recipe/favorite-recipe.component';

@NgModule({
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  declarations: [
    RecipesListComponent,
    RecipeCardComponent,
    SingleRecipeComponent,
    RecipeComponent,
    FavoriteRecipeComponent
  ]
})
export class RecipeModule { }
