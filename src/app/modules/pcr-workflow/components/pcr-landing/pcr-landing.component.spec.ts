import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrLandingComponent } from './pcr-landing.component';

describe('PcrLandingComponent', () => {
  let component: PcrLandingComponent;
  let fixture: ComponentFixture<PcrLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcrLandingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
