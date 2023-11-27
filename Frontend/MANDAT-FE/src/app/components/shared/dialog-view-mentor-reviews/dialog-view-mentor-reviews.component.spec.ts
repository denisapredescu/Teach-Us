import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MyReviews } from 'src/app/models/my-reviews';
import { DialogViewMentorReviewsComponent } from './dialog-view-mentor-reviews.component';

fdescribe('DialogViewMentorReviewsComponent', () => {
  let component: DialogViewMentorReviewsComponent;
  let fixture: ComponentFixture<DialogViewMentorReviewsComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewMentorReviewsComponent ],
      
    })
    .compileComponents();
    fixture = TestBed.createComponent(DialogViewMentorReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});