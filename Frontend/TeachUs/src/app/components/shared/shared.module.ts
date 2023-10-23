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

@NgModule({
  declarations: [
    DialogViewStudentReviewsComponent,
    DialogAddReviewByStudentComponent
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
    DialogAddReviewByStudentComponent
  ]
})
export class SharedModule { }
