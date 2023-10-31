import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MentorModel } from 'src/app/models/mentor-model';
import { ReviewService } from 'src/app/services/review.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-my-mentors',
  templateUrl: './my-mentors.component.html',
  styleUrls: ['./my-mentors.component.scss']
})

export class MyMentorsComponent implements OnInit{
  public emailSt?: string;
  public mentors: MentorModel[] = [];
  constructor(
    private reviewService: ReviewService,
    private myStudentService: StudentService,
    private cookie: CookieService,
  ){}
  ngOnInit(): void {
    this.emailSt = this.cookie.get('Email');
    if(this.emailSt){
      this.myStudentService.getMentorsForStudent(this.emailSt).subscribe(
        (result: MentorModel[]) =>{
          this.mentors = result;
            for(let mentor of this.mentors)
            {
              this.reviewService.getMentorsStars(mentor.email).subscribe(
                (result:number) => {
                  mentor.numberOfStars = result;
                },
                (error) => {
                  console.error(error);
                }
                );
            }
        },
        (error) => {
          console.error(error);
        }
        );
    }
   
  }
}




