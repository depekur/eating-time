import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RecipesListComponent} from "./recipe/recipes-list/recipes-list.component";
import {SingleRecipeComponent} from "./recipe/single-recipe/single-recipe.component";
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import {CalendarComponent} from "./ration/calendar/calendar.component";
import {WeekRationComponent} from "./ration/week-ration/week-ration.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: RecipesListComponent},
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'add-recipe', loadChildren: './recipe/create-recipe/create-recipe.module#CreateRecipeModule'},

    {path: 'recipe/all',  component: RecipesListComponent},
    {path: 'recipe/:id', component: SingleRecipeComponent},

    {path: 'calendar', component: CalendarComponent},
    {path: 'week', component: WeekRationComponent},

    {path: '**', component: PageNotFoundComponent}

    ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
