import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {IsLoggedInGuard} from "./shared/guards/is-logged-in.guard";

// @NgModule({
//   imports: [RouterModule.forRoot([
//     {
//       path: '', component: AppComponent, canActivate: [IsLoggedInGuard],
//       children: [
//         {path: '', pathMatch: 'full', redirectTo: 'recipe'},
//         {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
//         {path: 'recipe', loadChildren: './recipe/recipe.module#RecipeModule'},
//         {path: 'recipe/add', loadChildren: './create-recipe/create-recipe.module#CreateRecipeModule'},
//       ]
//     }])],
//     exports: [RouterModule],
//     providers: [IsLoggedInGuard]
//   })
// export class AppRoutingModule {
// }



@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'recipe', loadChildren: './recipe/recipe.module#RecipeModule'},
    {path: 'add-recipe', loadChildren: './create-recipe/create-recipe.module#CreateRecipeModule'}
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
