import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogViewStudentReviewsComponent } from './dialog-view-student-reviews/dialog-view-student-reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { DialogAddReviewByStudentComponent } from './dialog-add-review-by-student/dialog-add-review-by-student.component';
import { DialogAddReviewByMentorComponent } from './dialog-add-review-by-mentor/dialog-add-review-by-mentor.component';
import { DialogViewMentorReviewsComponent } from './dialog-view-mentor-reviews/dialog-view-mentor-reviews.component';

@NgModule({
  declarations: [
    DialogViewStudentReviewsComponent,
    DialogAddReviewByStudentComponent,
    DialogAddReviewByMentorComponent,
    DialogViewMentorReviewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule
  ],
  entryComponents:[
    DialogViewStudentReviewsComponent,
    DialogAddReviewByStudentComponent,
    DialogAddReviewByMentorComponent,
    DialogViewMentorReviewsComponent
  ]
})
export class SharedModule { }
