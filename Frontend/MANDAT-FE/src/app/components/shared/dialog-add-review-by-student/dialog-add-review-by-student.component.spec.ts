import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddReviewByStudentComponent } from './dialog-add-review-by-student.component';

import { of } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

fdescribe('DialogAddReviewByStudentComponent', () => {
  let component: DialogAddReviewByStudentComponent;
  let fixture: ComponentFixture<DialogAddReviewByStudentComponent>;
  let mockReviewsService: jasmine.SpyObj<ReviewService>;
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {

    mockReviewsService = jasmine.createSpyObj('ReviewService', ['createReview']); // Initialize mockReviewsService

    await TestBed.configureTestingModule({
      declarations: [ DialogAddReviewByStudentComponent ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }, // Mock for MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock for MAT_DIALOG_DATA
        { provide: ReviewService, useValue: mockReviewsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddReviewByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should', () => {

    const role = component.roles.Student;
    component.role = role;
    const email = "t@gmail.com";

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'Email') {
        return email;
      } else if (key === 'Rol') {
        return role;
      }
      return null;
    });
  });

  it('should test saveAdd', () => {
    const mockReview = {
      message: 'Test Message',
      starsNumber: 7,
      mentorEmail: 'mentor@test.com',
      studentEmail: 'student@test.com',
      reviewStatus: 'ReviewStatus',
    };

    mockReviewsService.createReview.and.returnValue(of(true));

    component.addReviewForm.patchValue(mockReview);
    component.saveAdd();

    expect(mockReviewsService.createReview).toHaveBeenCalledOnceWith({
      message: 'Test Message',
      starsNumber: 5,
      mentorEmail: 'mentor@test.com',
      studentEmail: 'student@test.com',
      reviewStatus: 'ReviewStatus',
      });
  });


  it('should get message control', () => {
    expect(component.message).toBeTruthy();
  });

  it('should get starsNumber control', () => {
    expect(component.starsNumber).toBeTruthy();
  });

  it('should get mentorEmail control', () => {
    expect(component.mentorEmail).toBeTruthy();
  });

  it('should get studentEmail control', () => {
    expect(component.studentEmail).toBeTruthy();
  });
});
