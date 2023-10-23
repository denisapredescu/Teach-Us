import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MyReviews } from 'src/app/models/my-reviews';
import { DialogViewStudentReviewsComponent } from './dialog-view-student-reviews.component';

fdescribe('DialogViewStudentReviewsComponent', () => {
  let component: DialogViewStudentReviewsComponent;
  let fixture: ComponentFixture<DialogViewStudentReviewsComponent>;
  let reviews: MyReviews[] =[];
  let model: MyReviews = {
    
      id:"339ABB22-AB13-44AE-B144-06AAA3E2A75D",
      message:"s",
      starsNumber: 2,
      mentorName: "sora",
      studentName: "sara",
      userImage:"g",
    
  }
  reviews=[
    {
      id:"339ABB22-AB13-44AE-B144-06AAA3E2A75D",
      message:"s",
      starsNumber: 2,
      mentorName: "sora",
      studentName: "sara",
      userImage:"g",
    },
    {
      id:"339ABB22-AB13-44AE-B147-06AAA3E2A75D",
      message:"sdas",
      starsNumber: 3,
      mentorName: "mara",
      studentName: "sara",
      userImage:"yv",
      }]
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewStudentReviewsComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatTableModule
      ],     
      providers:[
        {
          provide: MAT_DIALOG_DATA,
          useValue: model
        }
      ] 
    })
    .overrideTemplate(DialogViewStudentReviewsComponent, `<ng-container matColumnDef="mentorName" *ngIf="role === 'student'">
    <th mat-header-cell *matHeaderCellDef> Mentor Name </th>
    <td mat-cell *matCellDef="let element">{{element.mentorName}}</td>
</ng-container>`)
    .compileComponents();
    fixture = TestBed.createComponent(DialogViewStudentReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create for student', () => {

    component.role="student";
   component.displayedColumns = ['message','starsNumber','mentorName','edit'];
    expect(component).toBeTruthy();
  });

  it('should create for mentor', () => {

    component.role="mentor";
   component.displayedColumns = ['message','starsNumber','studentName','edit'];
    expect(component).toBeTruthy();
  });

});