import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPortalComponent } from './about-portal.component';

describe('AboutPortalComponent', () => {
  let component: AboutPortalComponent;
  let fixture: ComponentFixture<AboutPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
