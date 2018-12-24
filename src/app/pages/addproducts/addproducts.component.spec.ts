import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductsComponent } from './addproducts.component';

describe('AddproductsComponent', () => {
  let component: AddproductsComponent;
  let fixture: ComponentFixture<AddproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
