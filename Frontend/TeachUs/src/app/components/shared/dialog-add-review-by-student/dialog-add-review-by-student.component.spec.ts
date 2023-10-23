import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReviewByStudentComponent } from './dialog-add-review-by-student.component';

describe('DialogAddReviewByStudentComponent', () => {
  let component: DialogAddReviewByStudentComponent;
  let fixture: ComponentFixture<DialogAddReviewByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddReviewByStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddReviewByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
