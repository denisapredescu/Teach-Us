import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MyReviews } from 'src/app/models/my-reviews';
import { DialogViewStudentReviewsComponent } from './dialog-view-student-reviews.component';

describe('DialogViewStudentReviewsComponent', () => {
  let component: DialogViewStudentReviewsComponent;
  let fixture: ComponentFixture<DialogViewStudentReviewsComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewStudentReviewsComponent ],
      
    })
    .compileComponents();
    fixture = TestBed.createComponent(DialogViewStudentReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});