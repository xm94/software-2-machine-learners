import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskDetailComponent } from './subtask-detail.component';

describe('SubtaskDetailComponent', () => {
  let component: SubtaskDetailComponent;
  let fixture: ComponentFixture<SubtaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
