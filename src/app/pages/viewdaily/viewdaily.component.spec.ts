import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdailyComponent } from './viewdaily.component';

describe('ViewdailyComponent', () => {
  let component: ViewdailyComponent;
  let fixture: ComponentFixture<ViewdailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
