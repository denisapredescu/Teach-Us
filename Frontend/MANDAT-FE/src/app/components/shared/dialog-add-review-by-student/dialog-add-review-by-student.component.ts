import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/constants/roles';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-dialog-add-review-by-student',
  templateUrl: './dialog-add-review-by-student.component.html',
  styleUrls: ['./dialog-add-review-by-student.component.scss']
})
export class DialogAddReviewByStudentComponent implements OnInit{
  ngOnInit(): void { 
    
  }
  public reviewStatus: string = '';
  public emailStudent: string = '';
  public emailMentor: string | null = '';
  public user:any;
  public role : string | null;
  roles: Roles = new Roles();

  public addReviewForm: FormGroup = new FormGroup({
    message: new FormControl(''),
    starsNumber: new FormControl(0),
    mentorEmail: new FormControl(''),
    studentEmail:new FormControl(''),
    reviewStatus:new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<DialogAddReviewByStudentComponent>,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    if(data){
      this.user = data.data;
    }
    
    this.role = localStorage.getItem("Rol") !== null ? localStorage.getItem("Rol") : sessionStorage.getItem("Rol");;
    
    if (this.role === this.roles.Mentor) {
      this.reviewStatus = "ReviewStudent";
      this.emailMentor =  localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
      this.emailStudent= this.user.email;
    }
    
    this.addReviewForm.get('studentEmail')?.setValue(this.emailStudent);
    this.addReviewForm.get('reviewStatus')?.setValue(this.reviewStatus);
    this.addReviewForm.get('mentorEmail')?.setValue(this.emailMentor);
  }

  get message(): AbstractControl{
    return this.addReviewForm.get('message') as AbstractControl;
  }

  get starsNumber(): AbstractControl{
    return this.addReviewForm.get('starsNumber') as AbstractControl;
  }

  get mentorEmail(): AbstractControl{
    return this.addReviewForm.get('mentorEmail') as AbstractControl;
  }

  get studentEmail(): AbstractControl{
    return this.addReviewForm.get('studentEmail') as AbstractControl;
  }

  public saveAdd(): void{
    if (this.addReviewForm.value.starsNumber > 5) 
      this.addReviewForm.value.starsNumber = 5;
      
    this.reviewService.createReview(this.addReviewForm.value).subscribe(
      (result) =>{
        this.dialogRef.close(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
