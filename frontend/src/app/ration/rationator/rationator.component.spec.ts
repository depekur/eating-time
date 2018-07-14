import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationatorComponent } from './rationator.component';

describe('RationatorComponent', () => {
  let component: RationatorComponent;
  let fixture: ComponentFixture<RationatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
