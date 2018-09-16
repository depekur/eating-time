import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from '../shared/shared.module';
import { RationCrudService } from './service/ration-crud.service';

@NgModule({
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  declarations: [
    RecipeComponent,
    SingleRecipeComponent,
    RecipesListComponent,
    RecipeCardComponent
  ],
  providers: [RationCrudService]
})
export class RecipeModule { }
