import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSelectComponent } from './ingredients-select.component';

describe('IngredientsSelectComponent', () => {
  let component: IngredientsSelectComponent;
  let fixture: ComponentFixture<IngredientsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
