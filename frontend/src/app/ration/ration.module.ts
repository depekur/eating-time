import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RationRoutingModule } from './ration-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { RationComponent } from './ration.component';
import { WeekRationComponent } from './week-ration/week-ration.component';
import { RationNavComponent } from './ration-nav/ration-nav.component';
import { RationCreatorComponent } from './ration-creator/ration-creator.component';
import { RationatorComponent } from './rationator/rationator.component';

@NgModule({
  imports: [
    CommonModule,
    RationRoutingModule
  ],
  declarations: [
    CalendarComponent,
    RationComponent,
    WeekRationComponent,
    RationNavComponent,
    RationCreatorComponent,
    RationatorComponent
  ]
})
export class RationModule { }
