import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsDeskComponent } from './directors-desk.component';

describe('DirectorsDeskComponent', () => {
  let component: DirectorsDeskComponent;
  let fixture: ComponentFixture<DirectorsDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorsDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorsDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
