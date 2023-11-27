import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/constants/roles';
import { MyReviews } from 'src/app/models/my-reviews';
import { ReviewEdit } from 'src/app/models/review-edit';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-dialog-view-mentor-reviews',
  templateUrl: './dialog-view-mentor-reviews.component.html',
  styleUrls: ['./dialog-view-mentor-reviews.component.scss']
})
export class DialogViewMentorReviewsComponent implements OnInit{

  public reviews: MyReviews[]=[];
  public reviewEdit: ReviewEdit[] = [];
  public displayedColumns = ['message','starsNumber', 'mentorName','edit', 'delete'];
  public emailUser: string | null;
  public role: string  | null = '';
  roles: Roles = new Roles();
  public count: number = 0;

  constructor(
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public date: any
  ){ }

  ngOnInit(){
    this.emailUser = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
    this.role = localStorage.getItem("Rol") !== null ? localStorage.getItem("Rol") : sessionStorage.getItem("Rol");
    if (this.role === "student") {
      this.reviewService.getAllStudentReviews(this.emailUser!).subscribe(
        (result: MyReviews[]) => {
          this.reviews = result;
        },
        (error) => {
          console.error(error);
        });
      this.displayedColumns = ['message','starsNumber', 'mentorName','edit', 'delete'];
    }  
  }

  public editReview(id:any,message: string){
    this.count ++;
    if(this.count % 2 != 0) { 
      let div = document.getElementById(id);
      if (div != null)
        div.removeAttribute("readonly");
    }
    else {
      this.reviewService.editReview(id, message).subscribe(
      (result) =>{
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
      );
    }
  }

  public delete(id: any): void{
    this.reviewService.deleteReview(id).subscribe(result => {
      console.log(result);
      this.reviewService.getAllStudentReviews(this.emailUser!).subscribe(
        (result: MyReviews[]) => {
          this.reviews = result;
        },
        (error) => {
          console.error(error);
        });
    });
  }
  
}


