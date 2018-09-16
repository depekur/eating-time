import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tabs, Tab } from "./components/tabs/tabs.component";
import { RouterModule } from "@angular/router";
import { CustomSelectComponent } from "./components/custom-select/custom-select.component";
import { SearchHighligthPipe } from './pipe/search-highligth.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { FavoriteRecipeComponent } from "../recipe/favorite-recipe/favorite-recipe.component";
import { CalendarComponent } from "../ration/calendar/calendar.component";
import { WeekRationComponent } from "../ration/week-ration/week-ration.component";
import { RationatorComponent } from "../ration/rationator/rationator.component";
import { DragAndDropModule } from "angular-draggable-droppable";
import { WordEndingsPipe } from './pipe/word-endings.pipe';
import { ToTopComponent } from './components/to-top/to-top.component';
import { StickDirective } from './directive/stick.directive';
import { InfoMessageComponent } from "./components/info-message/info-message.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DragAndDropModule.forRoot()
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    CustomSelectComponent,
    Tabs,
    Tab,
    SearchHighligthPipe,
    SearchPipe,
    FavoriteRecipeComponent,
    CalendarComponent,
    WeekRationComponent,
    RationatorComponent,
    WordEndingsPipe,
    ToTopComponent,
    StickDirective,
    InfoMessageComponent
  ],
  declarations: [
    CustomSelectComponent,
    Tabs,
    Tab,
    SearchHighligthPipe,
    SearchPipe,
    FavoriteRecipeComponent,
    CalendarComponent,
    WeekRationComponent,
    RationatorComponent,
    WordEndingsPipe,
    ToTopComponent,
    StickDirective,
    InfoMessageComponent
  ]
})
export class SharedModule { }
