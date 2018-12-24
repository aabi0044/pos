import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbillsComponent } from './addbills.component';

describe('AddbillsComponent', () => {
  let component: AddbillsComponent;
  let fixture: ComponentFixture<AddbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
