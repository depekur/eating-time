import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tabs, Tab } from "../components/tabs/tabs.component";

import { CustomSelectComponent } from "../components/custom-select/custom-select.component";

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
    Tab
  ],
  declarations: [
    CustomSelectComponent,
    Tabs,
    Tab
  ]
})
export class SharedModule { }
