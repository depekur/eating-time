import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationNavComponent } from './ration-nav.component';

describe('RationNavComponent', () => {
  let component: RationNavComponent;
  let fixture: ComponentFixture<RationNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
