import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystProgressComponent } from './analyst-progress.component';

describe('AnalystProgressComponent', () => {
  let component: AnalystProgressComponent;
  let fixture: ComponentFixture<AnalystProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
