import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloRegistrationActivityComponent } from './solo-registration-activity.component';

describe('SoloRegistrationActivityComponent', () => {
  let component: SoloRegistrationActivityComponent;
  let fixture: ComponentFixture<SoloRegistrationActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloRegistrationActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloRegistrationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
