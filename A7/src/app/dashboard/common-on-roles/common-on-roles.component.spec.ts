import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonOnRolesComponent } from './common-on-roles.component';

describe('CommonOnRolesComponent', () => {
  let component: CommonOnRolesComponent;
  let fixture: ComponentFixture<CommonOnRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonOnRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonOnRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
