import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tabs, Tab } from "../components/tabs/tabs.component";

import { CustomSelectComponent } from "../components/custom-select/custom-select.component";
import {FormErrorsComponent} from "../components/form-errors/form-errors.component";
import { SearchHighligthPipe } from './pipe/search-highligth.pipe';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    CustomSelectComponent,
    Tabs,
    Tab,

    FormErrorsComponent,

    SearchHighligthPipe,
    SearchPipe
  ],
  declarations: [
    CustomSelectComponent,
    Tabs,
    Tab,

    FormErrorsComponent,

    SearchHighligthPipe,
    SearchPipe
  ]
})
export class SharedModule { }
