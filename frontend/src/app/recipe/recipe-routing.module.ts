import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { SingleRecipeComponent } from "./single-recipe/single-recipe.component";

const recipeRoutes: Routes = [{
  path: '', component: RecipeComponent,
  children: [
    {path: '', component: RecipesListComponent},
    //{path: 'recipes',  component: RecipesListComponent},
    {path: 'recipe/:id', component: SingleRecipeComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {
}
