import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleoutreportComponent } from './saleoutreport.component';

describe('SaleoutreportComponent', () => {
  let component: SaleoutreportComponent;
  let fixture: ComponentFixture<SaleoutreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleoutreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleoutreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
