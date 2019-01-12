import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilllistComponent } from './billlist.component';

describe('BilllistComponent', () => {
  let component: BilllistComponent;
  let fixture: ComponentFixture<BilllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
