import { Component } from '@angular/core';
import { MentorService } from 'src/app/services/mentor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogViewStudentReviewsComponent } from 'src/app/components/shared/dialog-view-student-reviews/dialog-view-student-reviews.component';
import { CookieService } from 'ngx-cookie-service';
import { ReviewService } from 'src/app/services/review.service';
import { StudentModel } from 'src/app/models/student-model';
@Component({
  selector: "app-my-students",
  templateUrl: "./my-students.component.html",
  styleUrls: ["./my-students.component.scss"],
})
export class MyStudentsComponent {
  public students: StudentModel[] = [];
  public email: string = "";
  public sortByStarsAsc: boolean = true;
  public sortByNameAsc: boolean = true;
  
  constructor(
    private mentorService: MentorService,
    private reviewService: ReviewService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.email = this.cookieService.get('Email');
    console.log(this.email);
    this.mentorService.getMyStudents(this.cookieService.get('Email')).subscribe(
      (response) => {
        console.log(response);
        this.students = response;
        for(let student of this.students) {
          this.reviewService.getStudentStars(student.email).subscribe(
            (result:number) => {
              student.numberOfStars = result;
            },
            (error) => {
              console.error(error);
            });
        }
        this.sortByNameASC();
        this.sortByNameAsc = true;
      }, 
      (error) => {
        console.error(error);
      }
    );
  }

  public sortByNameASC() {
    this.sortByNameAsc = true;
    this.students.sort((a, b) => {
        return a.username.localeCompare(b.username);
    });
  }

  public sortByNameDESC() {
    this.sortByNameAsc = false;
    this.students.sort((a, b) => {
        return b.username.localeCompare(a.username);
    });
  }

  public sortedStarsAscending() {
    this.sortByStarsAsc = true;
    this.students.sort((a, b) => {
      return (a.numberOfStars !== undefined? a.numberOfStars : 0) - (b.numberOfStars !== undefined? b.numberOfStars : 0);
    });
  }

  public sortedStarsDescending() {
    this.sortByStarsAsc = false;
    this.students.sort((a, b) => {
      return (b.numberOfStars !== undefined? b.numberOfStars : 0) - (a.numberOfStars !== undefined? a.numberOfStars : 0);
    });
  }

  public getMyReviews() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';
    dialogConfig.height = '900px';
  
    const dialog = this.dialog.open(DialogViewStudentReviewsComponent, dialogConfig);
    dialog.afterClosed().subscribe((result) =>{
      if(result){
        this.students = result;
      }
    }); 
  }
}