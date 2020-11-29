import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFindingComponent } from './create-finding.component';

describe('CreateFindingComponent', () => {
  let component: CreateFindingComponent;
  let fixture: ComponentFixture<CreateFindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
