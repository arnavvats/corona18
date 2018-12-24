import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhnComponent } from './event-phn.component';

describe('EventPhnComponent', () => {
  let component: EventPhnComponent;
  let fixture: ComponentFixture<EventPhnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPhnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
