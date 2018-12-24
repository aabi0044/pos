import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddailyComponent } from './adddaily.component';

describe('AdddailyComponent', () => {
  let component: AdddailyComponent;
  let fixture: ComponentFixture<AdddailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
