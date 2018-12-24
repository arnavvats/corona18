import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventButtonPhnComponent } from './event-button-phn.component';

describe('EventButtonPhnComponent', () => {
  let component: EventButtonPhnComponent;
  let fixture: ComponentFixture<EventButtonPhnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventButtonPhnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventButtonPhnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
