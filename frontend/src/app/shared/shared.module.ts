import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tabs, Tab } from "../components/tabs/tabs.component";

import { CustomSelectComponent } from "../components/custom-select/custom-select.component";
import {FormErrorsComponent} from "../components/form-errors/form-errors.component";

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

    FormErrorsComponent
  ],
  declarations: [
    CustomSelectComponent,
    Tabs,
    Tab,

    FormErrorsComponent
  ]
})
export class SharedModule { }
