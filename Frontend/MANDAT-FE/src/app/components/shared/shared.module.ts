import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogViewStudentReviewsComponent } from './dialog-view-student-reviews/dialog-view-student-reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { DialogAddReviewByStudentComponent } from './dialog-add-review-by-student/dialog-add-review-by-student.component';
import { DialogAddAssessmentByTeacherComponent } from './dialog-add-assessment-by-teacher/dialog-add-assessment-by-teacher.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DialogViewStudentReviewsComponent,
    DialogAddReviewByStudentComponent,
    DialogAddAssessmentByTeacherComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
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
    DialogAddReviewByStudentComponent
  ],
  exports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
