import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleoutComponent } from './saleout.component';

describe('SaleoutComponent', () => {
  let component: SaleoutComponent;
  let fixture: ComponentFixture<SaleoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
