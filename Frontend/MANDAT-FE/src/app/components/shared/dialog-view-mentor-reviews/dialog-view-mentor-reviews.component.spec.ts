import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MyReviews } from 'src/app/models/my-reviews';
import { DialogViewMentorReviewsComponent } from './dialog-view-mentor-reviews.component';
import { of } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { FormsModule } from '@angular/forms';

fdescribe('DialogViewMentorReviewsComponent', () => {
  let component: DialogViewMentorReviewsComponent;
  let fixture: ComponentFixture<DialogViewMentorReviewsComponent>;
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
    mockReviewsService = jasmine.createSpyObj('ReviewService', ['getAllStudentReviews', 'editReview', 'deleteReview']);

    await TestBed.configureTestingModule({
      declarations: [DialogViewMentorReviewsComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatTableModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: model },
        { provide: ReviewService, useValue: mockReviewsService }, // Provide the mock service
      ],
    })
      .overrideTemplate(DialogViewMentorReviewsComponent, `<ng-container matColumnDef="mentorName" *ngIf="role === roles.Mentor">
    <th mat-header-cell *matHeaderCellDef> Mentor Name </th>
    <td mat-cell *matCellDef="let element">{{element.mentorName}}</td>
</ng-container>`)
      .compileComponents();

    fixture = TestBed.createComponent(DialogViewMentorReviewsComponent);
    component = fixture.componentInstance;

    // Now, you can spy on the service methods
    mockReviewsService.getAllStudentReviews.and.returnValue(of([]));
    mockReviewsService.deleteReview.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    component.role = 'student';
    component.displayedColumns = ['message', 'starsNumber', 'mentorName', 'edit', 'delete'];
    expect(component).toBeTruthy();
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

  it('should initialize with student email and get his reviews', () => {
    const email = 'test@example.com';
    const role = 'student';

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'Email') {
        return email;
      } else if (key === 'Rol') {
        return role;
      }
      return null;
    });

    mockReviewsService.getAllStudentReviews.and.returnValue(of([{
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
    expect(mockReviewsService.getAllStudentReviews).toHaveBeenCalledWith(email);

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
  
});