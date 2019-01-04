import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRoundsComponent } from './event-rounds.component';

describe('EventRoundsComponent', () => {
  let component: EventRoundsComponent;
  let fixture: ComponentFixture<EventRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
