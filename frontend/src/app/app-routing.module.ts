import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'recipe', loadChildren: './recipe/recipe.module#RecipeModule'},
  ])],
    exports: [RouterModule]
  })
export class AppRoutingModule {
}
