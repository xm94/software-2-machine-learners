import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdetailedComponent } from './eventdetailed.component';

describe('EventdetailedComponent', () => {
  let component: EventdetailedComponent;
  let fixture: ComponentFixture<EventdetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
