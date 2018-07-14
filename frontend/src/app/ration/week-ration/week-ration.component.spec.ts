import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekRationComponent } from './week-ration.component';

describe('WeekRationComponent', () => {
  let component: WeekRationComponent;
  let fixture: ComponentFixture<WeekRationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekRationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekRationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
