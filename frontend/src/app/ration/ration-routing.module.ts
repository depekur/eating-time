import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { RationComponent } from './ration.component';
import { WeekRationComponent } from './week-ration/week-ration.component';

const routes: Routes = [
  {
    path: '', component: RationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'calendar'},
      {path: 'calendar', component: CalendarComponent},
      {path: 'week', component: WeekRationComponent},
      {path: 'add-recipe', loadChildren: '../recipe/create-recipe/create-recipe.module#CreateRecipeModule'},
      {path: 'recipe', loadChildren: '../recipe/recipe.module#RecipeModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RationRoutingModule { }
