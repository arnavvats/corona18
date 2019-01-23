import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRegistrationActivityComponent } from './team-registration-activity.component';

describe('TeamRegistrationActivityComponent', () => {
  let component: TeamRegistrationActivityComponent;
  let fixture: ComponentFixture<TeamRegistrationActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRegistrationActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRegistrationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
