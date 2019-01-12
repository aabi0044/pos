import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedbillComponent } from './detailedbill.component';

describe('DetailedbillComponent', () => {
  let component: DetailedbillComponent;
  let fixture: ComponentFixture<DetailedbillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedbillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
