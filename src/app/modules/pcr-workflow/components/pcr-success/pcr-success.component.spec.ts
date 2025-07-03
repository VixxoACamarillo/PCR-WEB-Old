import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrSuccessComponent } from './pcr-success.component';

describe('PcrSuccessComponent', () => {
  let component: PcrSuccessComponent;
  let fixture: ComponentFixture<PcrSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcrSuccessComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
