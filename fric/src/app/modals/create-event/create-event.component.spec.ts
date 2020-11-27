import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventModal } from './create-event.component';

describe('CreateEventModal', () => {
  let component: CreateEventModal;
  let fixture: ComponentFixture<CreateEventModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
