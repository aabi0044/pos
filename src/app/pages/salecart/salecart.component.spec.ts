import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalecartComponent } from './salecart.component';

describe('SalecartComponent', () => {
  let component: SalecartComponent;
  let fixture: ComponentFixture<SalecartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalecartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
