import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MyReviews } from 'src/app/models/my-reviews';
import { DialogViewStudentReviewsComponent } from './dialog-view-student-reviews.component';
import { isEmpty, of } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

fdescribe('DialogViewStudentReviewsComponent', () => {
  let component: DialogViewStudentReviewsComponent;
  let fixture: ComponentFixture<DialogViewStudentReviewsComponent>;
  let reviews: MyReviews[] = [];
  let mockReviewsService: jasmine.SpyObj<ReviewService>;
  let model: MyReviews = {
    id: '339ABB22-AB13-44AE-B144-06AAA3E2A75B',
    message: 's',
    starsNumber: 2,
    mentorName: 'sora',
    studentName: 'sara',
    userImage: 'g',
  };

  reviews = [
    {
      id: '339ABB22-AB13-44AE-B144-06AAA3E2A75B',
      message: 's',
      starsNumber: 2,
      mentorName: 'sora',
      studentName: 'sara',
      userImage: 'g',
    },
    {
      id: '339ABB22-AB13-44AE-B147-06AAA3E2A75C',
      message: 'sdas',
      starsNumber: 3,
      mentorName: 'mara',
      studentName: 'sara',
      userImage: 'yv',
    },
  ];

  beforeEach(async () => {
    mockReviewsService = jasmine.createSpyObj('ReviewService', ['getAllMentorReviews', 'editReview', 'deleteReview']);

    await TestBed.configureTestingModule({
      declarations: [DialogViewStudentReviewsComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatTableModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: model },
        { provide: ReviewService, useValue: mockReviewsService },
      ],
    })
      .overrideTemplate(DialogViewStudentReviewsComponent, `<ng-container matColumnDef="studentName" *ngIf="role === roles.Mentor">
        <th mat-header-cell *matHeaderCellDef> Student Name </th>
        <td mat-cell *matCellDef="let element">{{element.studentName}}</td>
      </ng-container>`)
      .compileComponents();

    fixture = TestBed.createComponent(DialogViewStudentReviewsComponent);
    component = fixture.componentInstance;

    mockReviewsService.getAllMentorReviews.and.returnValue(of([]));
    mockReviewsService.deleteReview.and.returnValue(of(true));

    fixture.detectChanges();
  });
  

  it('should create', () => {
    component.role = 'mentor';
    component.displayedColumns = ['message', 'starsNumber', 'studentName', 'edit', 'delete'];
    expect(component).toBeTruthy();
  });

  it('should initialize with mentor email and get his reviews', () => {
    const email = 'test@example.com';
    const role = 'mentor';

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'Email') {
        return email;
      } else if (key === 'Rol') {
        return role;
      }
      return null;
    });

    mockReviewsService.getAllMentorReviews.and.returnValue(of([{
        id: '339ABB22-AB13-44AE-B144-06AAA3E2A75B',
        message: 's',
        starsNumber: 2,
        mentorName: 'sora',
        studentName: 'sara',
        userImage: 'g',
    },
    {
        id: '339ABB22-AB13-44AE-B147-06AAA3E2A75C',
        message: 'sdas',
        starsNumber: 3,
        mentorName: 'mara',
        studentName: 'sara',
        userImage: 'yv',
    }]));

    component.ngOnInit();

    expect(component.emailUser).toBe(email);
    expect(mockReviewsService.getAllMentorReviews).toHaveBeenCalledWith(email);

    expect(component.reviews).toEqual([{
        id: '339ABB22-AB13-44AE-B144-06AAA3E2A75B',
        message: 's',
        starsNumber: 2,
        mentorName: 'sora',
        studentName: 'sara',
        userImage: 'g',
    },
    {
        id: '339ABB22-AB13-44AE-B147-06AAA3E2A75C',
        message: 'sdas',
        starsNumber: 3,
        mentorName: 'mara',
        studentName: 'sara',
        userImage: 'yv',
    }]);
  });
  

  it('should edit a review', fakeAsync(() => {
  
    component.reviews = reviews;
    const reviewId = component.reviews[0].id;
    const initialMessage = component.reviews[0].message;
    component.role = component.roles.Mentor;
    component.count = 1;

    mockReviewsService.editReview.and.returnValue(of({
      id: '339ABB22-AB13-44AE-B144-06AAA3E2A75B',
      message: 'Hello',
      starsNumber: 2,
      mentorName: 'sora',
      studentName: 'sara',
      userImage: 'g',
    }));

    component.editReview(reviewId, 'Hello');
    component.editReview(reviewId, 'Hello');
    tick();

    expect(mockReviewsService.editReview).toHaveBeenCalledWith(reviewId, 'Hello');
  }));
  
  

  it('should delete review by id', fakeAsync(() => {

    component.reviews = reviews;
    const reviewId = component.reviews[1].id;

    mockReviewsService.deleteReview.and.returnValue(of(true));
    component.delete(reviewId);

    tick();

    expect(component.reviews.length).toBe(0);
  }));
});
