import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';

const recipesRoutes:Routes = [
  {
    path: '', component: RecipeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'all'},
      {path: 'all', component: RecipesListComponent},
      {path: ':id', component: SingleRecipeComponent}
    ]
  }
];

@NgModule({
	imports: [RouterModule.forChild(recipesRoutes)],
	exports: [RouterModule],
	declarations: [],
	providers: []
})
export class RecipeRoutingModule {
}
