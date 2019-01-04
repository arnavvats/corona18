import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleShooterComponent } from './trouble-shooter.component';

describe('TroubleShooterComponent', () => {
  let component: TroubleShooterComponent;
  let fixture: ComponentFixture<TroubleShooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleShooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleShooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
