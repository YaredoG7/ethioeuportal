import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingItemsComponent } from './selling-items.component';

describe('SellingItemsComponent', () => {
  let component: SellingItemsComponent;
  let fixture: ComponentFixture<SellingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
