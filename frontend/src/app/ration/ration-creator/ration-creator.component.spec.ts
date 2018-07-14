import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationCreatorComponent } from './ration-creator.component';

describe('RationCreatorComponent', () => {
  let component: RationCreatorComponent;
  let fixture: ComponentFixture<RationCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
