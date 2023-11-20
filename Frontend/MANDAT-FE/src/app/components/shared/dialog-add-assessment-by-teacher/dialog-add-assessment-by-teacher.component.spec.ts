import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAssessmentByTeacherComponent } from './dialog-add-assessment-by-teacher.component';

describe('DialogAddAssessmentByTeacherComponent', () => {
  let component: DialogAddAssessmentByTeacherComponent;
  let fixture: ComponentFixture<DialogAddAssessmentByTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAssessmentByTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddAssessmentByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
