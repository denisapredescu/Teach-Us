import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssessmentService } from 'src/app/services/assessment.service';

@Component({
  selector: 'app-dialog-add-assessment-by-teacher',
  templateUrl: './dialog-add-assessment-by-teacher.component.html',
  styleUrls: ['./dialog-add-assessment-by-teacher.component.scss']
})
export class DialogAddAssessmentByTeacherComponent implements OnInit {
  public emailStudent: string = '';
  public emailMentor: string | null = '';
  public user: any;

  public addAssessmentForm: FormGroup = new FormGroup({
    studentEmail: new FormControl(''),
    mentorEmail: new FormControl(''),
    assessmentDeadline: new FormControl(new Date()),  
    subject: new FormControl(''),
    text: new FormControl(''),
    mentorPdf: new FormControl(null), // Store the file object
  });

  constructor(
    private dialogRef: MatDialogRef<DialogAddAssessmentByTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assessmentService: AssessmentService
  ) {
    if (data) {
      this.user = data.data;
    }

    this.emailMentor = localStorage.getItem('Email');
    this.emailStudent = this.user.email;
    this.addAssessmentForm.get('studentEmail')?.setValue(this.emailStudent);
    this.addAssessmentForm.get('mentorEmail')?.setValue(this.emailMentor);

  }

  get studentEmail(): AbstractControl {
    return this.addAssessmentForm.get('studentEmail') as AbstractControl;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
  
    if (file) {
      this.addAssessmentForm.patchValue({
        mentorPdf: file
      });
    }
  }
  

  saveAdd(): void {
    // Handle form submission here, including sending the file to the backend
    const formData = new FormData();

    formData.append('mentorEmail', this.addAssessmentForm.get('mentorEmail')!.value);
    formData.append('studentEmail', this.addAssessmentForm.get('studentEmail')!.value);
    formData.append('assessmentDeadline', this.addAssessmentForm.get('assessmentDeadline')!.value);
    formData.append('subject', this.addAssessmentForm.get('subject')!.value);
    formData.append('text', this.addAssessmentForm.get('text')!.value);

    
    const mentorPdf = this.addAssessmentForm.get('mentorPdf')!.value;
console.log('Type of mentorPdf:', typeof mentorPdf);

if (mentorPdf instanceof File) {
  formData.append('mentorPdf', mentorPdf, mentorPdf.name);
}

  

  this.assessmentService.createAssessment(formData).subscribe(
    (result) => {
      this.dialogRef.close(result);
    },
    (error) => {
      console.log(error);
    }
  );
  }

  ngOnInit(): void {
    // Initialize if needed
  }
}
