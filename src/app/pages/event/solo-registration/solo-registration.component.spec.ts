import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloRegistrationComponent } from './solo-registration.component';

describe('SoloRegistrationComponent', () => {
  let component: SoloRegistrationComponent;
  let fixture: ComponentFixture<SoloRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
