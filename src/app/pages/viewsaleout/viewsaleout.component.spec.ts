import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsaleoutComponent } from './viewsaleout.component';

describe('ViewsaleoutComponent', () => {
  let component: ViewsaleoutComponent;
  let fixture: ComponentFixture<ViewsaleoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsaleoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsaleoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
